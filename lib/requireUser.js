import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Same shape as requireAdminApi, but only requires a logged-in session —
// used by seat-management routes any authenticated user can call.
export async function requireUserApi(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.id) {
    res.status(401).json({ error: "Unauthorized" });
    return null;
  }
  return session;
}
