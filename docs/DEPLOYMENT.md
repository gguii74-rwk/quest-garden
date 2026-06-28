# Deployment Setup

## Vercel

Use the `web` app as the deployment root.

```text
Project: gguii74-rwks-projects/quest-garden
Application Preset: Next.js
Root Directory: web
Install Command: npm install
Build Command: npm run build
Output Directory: Next.js default
Git Repository: gguii74-rwk/quest-garden
Production URL: https://quest-garden.vercel.app
```

The repository root does not contain a `package.json`; the production app is in
`web/package.json`.

On Windows PowerShell, prefer `vercel.cmd` over `vercel` if script execution
policy blocks the generated `vercel.ps1` shim.

After the project is linked locally, refresh project settings and preview envs
with:

```powershell
vercel.cmd pull --yes --environment preview --scope gguii74-rwks-projects
```

## Supabase Environment Variables

Set these variables in Vercel for Production and Preview, and in
`web/.env.local` for local development:

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Use the Supabase dashboard values:

```text
Project URL -> NEXT_PUBLIC_SUPABASE_URL
Publishable key -> NEXT_PUBLIC_SUPABASE_ANON_KEY
```

Do not use the direct database connection string for these public client
variables. Never put service role or secret keys in `NEXT_PUBLIC_*` variables.

## Supabase Migrations

Apply migrations from `supabase/migrations` in timestamp order:

```text
0001_initial_schema.sql
20260628004205_add_profile_self_insert_policy.sql
20260628011023_mission_server_actions.sql
20260628011503_reward_request_flow.sql
20260628095127_optimize_rls_auth_uid_initplan.sql
```

When the Supabase CLI is available, link the project first and then push the
migrations from the repository root.

On Windows PowerShell, prefer `supabase.cmd` over `supabase` if script execution
policy blocks the generated `supabase.ps1` shim.
