// One-off CLI to seed a login account (no public sign-up page exists yet).
// Usage:
//   node --env-file=.env.local scripts/create-user.js you@example.com somepassword --admin
const bcrypt = require("bcryptjs");
const { createClient } = require("@supabase/supabase-js");

async function main() {
  const [email, password, flag] = process.argv.slice(2);

  if (!email || !password) {
    console.error(
      "Usage: node --env-file=.env.local scripts/create-user.js <email> <password> [--admin]"
    );
    process.exit(1);
  }

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error(
      "Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY. Run with: node --env-file=.env.local scripts/create-user.js ..."
    );
    process.exit(1);
  }

  const supabaseAdmin = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false } }
  );

  const passwordHash = await bcrypt.hash(password, 10);
  const isAdmin = flag === "--admin";

  const { data, error } = await supabaseAdmin
    .from("users")
    .insert({ email: email.toLowerCase().trim(), password_hash: passwordHash, is_admin: isAdmin })
    .select("id, email, is_admin")
    .single();

  if (error) {
    console.error("Failed to create user:", error.message);
    process.exit(1);
  }

  console.log(`Created ${data.is_admin ? "admin" : "customer"} user: ${data.email} (${data.id})`);
}

main();
