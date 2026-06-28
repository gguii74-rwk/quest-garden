# Quest Garden Handoff

Updated: 2026-06-28  
Workspace: `C:\workspace\quest-garden`  
Default shell: Windows PowerShell

## Current State

Quest Garden is a Next.js app for a child quest/reward garden experience with a Supabase-backed parent approval flow. The production app lives in `web/`; `prototype/` is only for design exploration.

Important areas:

- `web/`: production Next.js app
- `web/src/app/`: App Router routes and server actions
- `web/src/features/quest-garden/`: main state/composition layer
- `web/src/components/child/`: child mode UI
- `web/src/components/parent/`: parent dashboard UI
- `web/src/lib/supabase/`: Supabase client/server helpers and types
- `supabase/migrations/`: remote DB schema history
- `docs/DEPLOYMENT.md`: Vercel/Supabase deployment notes

## Recent Setup

Supabase is configured and linked:

- Project: `quest-garden`
- Project ref: `bbmukrvtvdfqlhkktxmy`
- Region: `ap-northeast-2`
- URL: `https://bbmukrvtvdfqlhkktxmy.supabase.co`
- Local CLI command to use on PowerShell: `supabase.cmd`

Applied remote migrations:

```text
0001_initial_schema.sql
20260628004205_add_profile_self_insert_policy.sql
20260628011023_mission_server_actions.sql
20260628011503_reward_request_flow.sql
20260628095127_optimize_rls_auth_uid_initplan.sql
```

Supabase verification:

- `supabase.cmd migration list --linked`: local and remote match
- `supabase.cmd db advisors --linked --type all --level warn --fail-on none`: no issues found
- Read-only verification query found 10 app tables and 1 app function

Vercel is configured:

- Scope/project: `gguii74-rwks-projects/quest-garden`
- GitHub repo: `gguii74-rwk/quest-garden`
- Production branch: `main`
- Production URL: `https://quest-garden.vercel.app`
- Latest deployment URL: `https://quest-garden-m1okdn7h9-gguii74-rwks-projects.vercel.app`
- Latest deployment status: Ready
- Framework: `nextjs`
- Root Directory: `web`
- Build Command: `npm run build`
- Install Command: `npm install`
- Output Directory: Next.js default
- Local CLI command to use on PowerShell: `vercel.cmd`

Vercel env vars were added for Production, Preview, and Development:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

Do not print or commit env values. `web/.env.local`, root `.env.local`, and `.vercel/` are ignored.

## Verification

Last local checks:

```powershell
cd C:\workspace\quest-garden\web
npm.cmd run lint
npm.cmd run build
```

Both passed.

`vercel.cmd build --yes --scope gguii74-rwks-projects` compiled the Next.js app, then failed during local Vercel output packaging with:

```text
EPERM: operation not permitted, symlink ...
```

This is a local Windows symlink permission issue, not a Next.js compile failure. Remote Vercel builds should run on Linux and should not hit that Windows symlink limitation.

## Operational Notes

- Use `npm.cmd`, not bare `npm`, in PowerShell.
- Use `vercel.cmd`, not bare `vercel`, if PowerShell blocks `vercel.ps1`.
- Use `supabase.cmd`, not bare `supabase`, if PowerShell blocks `supabase.ps1`.
- `git status` may print a warning about `C:\Users\gguii\.config\git\ignore` permission. It has not blocked git operations.
- Docker Desktop is not available/running, so local `supabase start` was not used. Remote Supabase CLI operations worked.
- `web/` npm audit has 2 moderate findings. Do not run `npm audit fix --force` blindly because it may alter Next/React versions.

## Deployment Flow

After pushing to `main`, Vercel should create a deployment from the GitHub connection.
This was verified after commit `9e34f10`; the production deployment became Ready and `/`, `/login`, and `/onboarding` returned HTTP 200.

Useful checks:

```powershell
vercel.cmd projects ls --scope gguii74-rwks-projects
vercel.cmd env ls --scope gguii74-rwks-projects
vercel.cmd ls quest-garden --scope gguii74-rwks-projects
```

To manually trigger production deployment from the local workspace:

```powershell
vercel.cmd deploy --prod --scope gguii74-rwks-projects
```

Prefer GitHub-triggered deployment after commit/push unless there is a reason to deploy local uncommitted files.

## Next Work

1. Confirm GitHub push triggers the first Vercel deployment.
2. Inspect the Vercel deployment logs if the first build fails.
3. Open the production URL and test `/`, `/login`, and `/onboarding`.
4. Create or sign in with a test account.
5. Run the full Supabase-backed flow:
   - onboarding creates profile/child rows
   - home loads DB-backed child state
   - child submits a mission
   - parent approves a mission
   - points/stars/XP and `point_transactions` update
   - reward request persists
   - reading entry persists
6. Add focused integration/E2E coverage once the production URL is stable.
