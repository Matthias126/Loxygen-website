import { supabaseAdmin } from "@/lib/supabase";
import { requireAdminApi } from "@/lib/requireAdmin";

// Vercel's Serverless Functions hard-cap request bodies at 4.5mb, enforced
// before this code even runs — this limit must stay under that so Next gets
// a chance to return a clean error instead of the connection just dying
// (which shows up in the browser as a bare "Failed to fetch").
export const config = {
  api: { bodyParser: { sizeLimit: "4mb" } },
};

export default async function handler(req, res) {
  const session = await requireAdminApi(req, res);
  if (!session) return;

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { filename, contentType, dataBase64 } = req.body ?? {};

  if (!filename || !contentType || !dataBase64) {
    return res.status(400).json({ error: "filename, contentType and dataBase64 are required." });
  }

  const buffer = Buffer.from(dataBase64, "base64");
  const path = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9.\-_]/g, "_")}`;

  const { error: uploadError } = await supabaseAdmin.storage
    .from("blog-images")
    .upload(path, buffer, { contentType, upsert: false });

  if (uploadError) return res.status(500).json({ error: uploadError.message });

  const { data } = supabaseAdmin.storage.from("blog-images").getPublicUrl(path);

  return res.status(200).json({ url: data.publicUrl });
}
