import { supabaseAdmin } from "@/lib/supabase";
import { requireAdminApi } from "@/lib/requireAdmin";
import { createLicenseWithSeats } from "@/lib/licenses";
import { sendTransactionalEmail, buildLicenseConfirmationEmail } from "@/lib/email";

export default async function handler(req, res) {
  const session = await requireAdminApi(req, res);
  if (!session) return;

  if (req.method === "GET") {
    const { data: licenses, error } = await supabaseAdmin
      .from("licenses")
      .select("*, seats(*)")
      .order("created_at", { ascending: false });

    if (error) return res.status(500).json({ error: error.message });

    const ownerIds = [...new Set((licenses ?? []).map((license) => license.owner_user_id))];
    const { data: owners, error: ownersError } = await supabaseAdmin
      .from("users")
      .select("id, email")
      .in("id", ownerIds.length > 0 ? ownerIds : ["00000000-0000-0000-0000-000000000000"]);

    if (ownersError) return res.status(500).json({ error: ownersError.message });

    const emailByOwnerId = new Map((owners ?? []).map((owner) => [owner.id, owner.email]));
    const licensesWithOwner = (licenses ?? []).map((license) => ({
      ...license,
      owner_email: emailByOwnerId.get(license.owner_user_id) ?? null,
    }));

    return res.status(200).json({ licenses: licensesWithOwner });
  }

  if (req.method === "POST") {
    const { ownerEmail, tierId } = req.body ?? {};
    if (!ownerEmail || !tierId) {
      return res.status(400).json({ error: "Owner email and plan are required." });
    }

    const { data: owner, error: ownerError } = await supabaseAdmin
      .from("users")
      .select("id, email")
      .eq("email", ownerEmail.toLowerCase().trim())
      .maybeSingle();
    if (ownerError) return res.status(500).json({ error: ownerError.message });
    if (!owner) return res.status(404).json({ error: "No Loxygen account with that email." });

    let result;
    try {
      result = await createLicenseWithSeats({ ownerUserId: owner.id, tierId, source: "manual" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }

    const { subject, html } = buildLicenseConfirmationEmail({ seats: result.seats });
    await sendTransactionalEmail({ to: owner.email, subject, html });

    return res.status(201).json({ license: result.license, seats: result.seats });
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ error: "Method not allowed" });
}
