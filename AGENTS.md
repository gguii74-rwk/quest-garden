# Repository Guidelines

## Project Structure & Module Organization

This repository contains the Quest Garden product docs, prototype, web app, and database schema.

- `web/`: primary Next.js app. Source lives in `web/src/`, with route files in `src/app/`, reusable UI in `src/components/`, feature state and composition in `src/features/quest-garden/`, and shared data in `src/lib/`.
- `web/public/assets/`: runtime image assets used by the Next.js app.
- `prototype/`: Vite React prototype and visual QA artifacts. Use this for design exploration, not production code.
- `docs/`: PRD, handoff notes, and HTML mockups.
- `supabase/migrations/`: SQL migrations, starting with `0001_initial_schema.sql`.

## Build, Test, and Development Commands

Run commands from the relevant subproject directory.

```bash
cd web
npm install
npm run dev      # start Next.js on http://127.0.0.1:3000
npm run build    # create a production build
npm run start    # serve the production build
npm run lint     # run Next.js linting
```

```bash
cd prototype
npm install
npm run dev      # start the Vite prototype
npm run build    # build the prototype into dist/
npm run preview  # preview the built prototype
```

## Coding Style & Naming Conventions

Use TypeScript for production web code and JSX only inside the prototype unless migrating it deliberately. Match the existing two-space indentation, double quotes, semicolons, and named React component exports. Name React components in `PascalCase`, hooks as `useSomething`, and shared constants/data in `camelCase`. Use the `@/*` path alias inside `web/src`.

## Testing Guidelines

No automated test framework is configured yet. Before opening a PR, run `npm run lint` and `npm run build` in `web/`; run the equivalent build in `prototype/` when prototype files change. For future tests, prefer colocated `*.test.ts` or `*.test.tsx` files near the code they cover.

## Commit & Pull Request Guidelines

There is no existing Git history to derive conventions from. Use concise imperative commit messages such as `Add parent approval flow` or `Fix reward progress state`. PRs should include a short summary, affected areas (`web`, `prototype`, `docs`, `supabase`), verification commands, linked issues when available, and screenshots for UI changes.

## Security & Configuration Tips

Copy `web/.env.example` to `web/.env.local` for local secrets. Do not commit `.env*`, `node_modules/`, `.next/`, `dist/`, QA browser profiles, or generated screenshots unless they are intentional documentation artifacts.

## Agent Operational Notes

- This workspace runs PowerShell on Windows. Prefer `npm.cmd` over `npm`; direct `npm` calls can fail because PowerShell blocks `npm.ps1` under the current execution policy.
- `git status` may warn that `C:\Users\gguii\.config\git\ignore` is not accessible. This warning has not blocked commits or pushes.
- The Git remote is `origin` at `https://github.com/gguii74-rwk/quest-garden.git`; local `main` tracks `origin/main`.
- Supabase and Vercel plugin files exist in the Codex plugin cache, but their runtime tools were not exposed in this session after activation attempts.
- Supabase npm packages may already be installed in `web/` (`@supabase/ssr`, `@supabase/supabase-js`) as part of the next development step.
