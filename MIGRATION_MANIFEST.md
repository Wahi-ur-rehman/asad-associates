# Asad Associates → Lovable migration package

This package is a source migration snapshot. It includes the React/Vite frontend, Express/tRPC backend, shared code, Drizzle schema and SQL migrations, package manifests and lockfile, Docker/Vite/TypeScript configuration, documentation, and locally available public assets.

## Included

- `client/`: frontend source and public assets, including the local hero video.
- `server/` and `shared/`: backend, auth, platform adapters, routers, and shared types.
- `drizzle/`: schema, migration SQL, migration metadata, and relations.
- `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`, `patches/`: dependency and package setup.
- `Dockerfile`, `vite.config.ts`, `drizzle.config.ts`, `tsconfig.json`, `vitest.config.ts`, `components.json`, `app.config.ts`, and related project configuration.
- `.env.example`: required variable names with blank values only.
- Existing documentation and audit/handoff files.

## Intentionally excluded

- All `.env` files, secrets, credentials, passwords, password hashes, and session tokens.
- `node_modules/`, `dist/`, build output, caches, logs, Git history, and platform debug assets.
- Database records or database dumps. The package contains schema and migrations only.

## Important migration notes

The project currently references several managed `/manus-storage/` asset paths and durable CDN URLs from source. The locally available hero video is included. The missing client-supplied real media package should be added to Lovable before replacing illustrative media or changing source references.

The static Project Brief currently prepares email/WhatsApp handoffs; it does not persist leads or upload files to a backend. Configure an approved Lovable backend/form provider before treating submissions as stored.

Use the blank environment template and Lovable secrets manager rather than committing values into this package.
