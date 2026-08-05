import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Defense-in-depth alongside middleware.js's /api/admin/:path* gate — an
// admin API route should never trust the network boundary alone.
export async function requireAdminApi(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.isAdmin) {
    res.status(403).json({ error: "Forbidden" });
    return null;
  }
  return session;
}
