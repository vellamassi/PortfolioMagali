# PortfolioMagali

Portfolio site frontend (React + TypeScript + Vite), backed by a headless [Directus](https://directus.io/) CMS.

## Prerequisites

- Node.js `22.20.0` (see `.nvmrc` — run `nvm use` if you use nvm)
- npm
- Docker Desktop (for running Directus locally)
- SSH access to the production server via a `myserver` alias — needed for `routines/pull-data.sh`, `routines/backup.sh`, and the production tunnel. This alias is defined in a single file, `~/.ssh/config` — your personal, global SSH configuration, the same one you'd use for connecting to any server from any project. It's **not part of this repo or tied to where you clone it** — it already exists on machines you've used before, and on a brand new machine you'd create it fresh (nothing to do with `git clone`). If the `myserver` block isn't in there yet, add one:
  ```
  Host myserver
      HostName <server IP>
      User ubuntu
      IdentityFile ~/.ssh/<your private key>
  ```
  (real IP/key intentionally not written here — pull it from your password manager or a previous machine's config)

## Quick start (coming back after a break)

1. `nvm use`
2. `npm install`
3. Create `.env` in the project root with `VITE_DIRECTUS_URL=http://localhost:8055`
4. Copy `directus/env.template` to `directus/.env`, set `SECRET` to any random string (skip steps 3–4 if these files already exist)
5. Open Docker Desktop
6. `cd directus && ./routines/pull-data.sh` — pulls fresh content from production (optional)
7. `docker compose up -d` — starts Directus
8. `cd .. && npm run dev` — starts the frontend
9. Open http://localhost:5173 (site) and http://localhost:8055/admin (CMS)

To stop: `docker compose down` (in `directus/`), and `Ctrl+C` the dev server.

The sections below explain *why* each step works this way, for whenever you need more than the list.

## Getting started

```bash
npm install
npm run dev
```

This starts the Vite dev server at `http://localhost:5173`.

The frontend reads its Directus API URL from a local `.env` file at the project root (gitignored, not committed):

```
VITE_DIRECTUS_URL=http://localhost:8055
```

You need Directus reachable at that URL before the frontend can load any content. The standard workflow is to run Directus **locally**, against a snapshot of production data that you refresh on demand:

### Run Directus locally

```bash
cd directus
docker compose up -d
```

This starts a local Directus container using the SQLite snapshot in `directus/database/` and files in `directus/uploads/`. It requires a local `directus/.env` — copy `directus/env.template` to `directus/.env` and fill in a real `SECRET` if you don't already have one.

⚠️ **On a fresh `git clone`, `directus/database/` and `directus/uploads/` don't exist yet** — they're gitignored, real data, not part of the repo. If you run `docker compose up -d` before populating them, Docker just creates empty folders and Directus quietly bootstraps a **brand new, empty instance** instead of erroring — no real content, no existing admin account, easy to mistake for something being broken. Run `./routines/pull-data.sh` first (see below) to populate them with real content before starting Directus for the first time on a new machine.

Stop it when done:
```bash
cd directus
docker compose down
```

### Refreshing local data from production

Your local `database/`/`uploads/` are a **disposable snapshot** — they don't sync with production in either direction on their own. To pull down a fresh copy from the server:

```bash
cd directus
./routines/pull-data.sh
```

This stops the local container (if running), then `rsync`s `database/` and `uploads/` down from the server, overwriting your local copies. Run it whenever you want current content to develop against. It's one-directional (production → local only) — local edits you make against the local container are never pushed back up; content edits belong in the production admin panel, and schema changes need a deliberate, considered step rather than a blind overwrite.

### Backing up production

There's no automatic backup of production data — run this manually when you want one:

```bash
cd directus
./routines/backup.sh
```

This briefly stops production Directus, archives `database/` + `uploads/` into a timestamped `.tar.gz`, restarts it, then keeps a copy both on the server (`~/directus-gf-portfolio/backups/`) and locally (`directus/backups/`, gitignored — never committed). Keeps the last 5 backups in each location, pruning older ones.

### Alternative: tunnel into production directly

For the rare case where you need to see truly-live data without pulling a fresh snapshot first, you can tunnel into the production instance instead of running one locally:

```bash
ssh -L 8055:localhost:8055 myserver
```

Leave that running in its own terminal tab; `http://localhost:8055` then forwards to the server's Directus over an encrypted SSH connection (the production port is firewalled off from the public internet — this tunnel is the only way in). Don't run this at the same time as the local container — both use local port 8055.

## Backend deployment

The Directus backend for this project is deployed as its own Docker container on the VPS, isolated from any other project's instance (each future portfolio project gets its own container + port + database — see `directus/docker-compose.yml` for this instance's config). Production secrets and real data live only on the server and locally (`directus/.env`, `directus/database/`, `directus/uploads/`) — never committed to this repo. `directus/env.template` documents what variables are needed to stand up a fresh instance.
