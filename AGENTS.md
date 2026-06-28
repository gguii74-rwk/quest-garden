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
