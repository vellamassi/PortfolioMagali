#!/usr/bin/env bash

set -euo pipefail
cd "$(dirname "$0")/.."   # directus/

REMOTE_DIR="~/directus-gf-portfolio"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
DB_ARCHIVE="directus-db-${TIMESTAMP}.dump"
UPLOADS_ARCHIVE="directus-uploads-${TIMESTAMP}.tar.gz"
KEEP=5

echo "Dumping production Postgres database (no downtime needed for pg_dump)..."
ssh myserver "cd ${REMOTE_DIR} && mkdir -p backups && sudo docker compose exec -T postgres sh -c 'pg_dump -U \"\$POSTGRES_USER\" -d \"\$POSTGRES_DB\" -F c' > backups/${DB_ARCHIVE}"

echo "Archiving uploads/ on the server..."
ssh myserver "cd ${REMOTE_DIR} && tar -czf backups/${UPLOADS_ARCHIVE} uploads"

echo "Downloading both archives to local backups/..."
mkdir -p backups
scp "myserver:${REMOTE_DIR}/backups/${DB_ARCHIVE}" "backups/${DB_ARCHIVE}"
scp "myserver:${REMOTE_DIR}/backups/${UPLOADS_ARCHIVE}" "backups/${UPLOADS_ARCHIVE}"

echo "Pruning old backups on the server (keeping last ${KEEP} of each)..."
ssh myserver "cd ${REMOTE_DIR}/backups && ls -t directus-db-*.dump | tail -n +$((KEEP + 1)) | xargs -r rm -f"
ssh myserver "cd ${REMOTE_DIR}/backups && ls -t directus-uploads-*.tar.gz | tail -n +$((KEEP + 1)) | xargs -r rm -f"

echo "Pruning old local backups (keeping last ${KEEP} of each)..."
(cd backups && ls -t directus-db-*.dump | tail -n +$((KEEP + 1)) | xargs -r rm -f)
(cd backups && ls -t directus-uploads-*.tar.gz | tail -n +$((KEEP + 1)) | xargs -r rm -f)

echo "Done: backups/${DB_ARCHIVE} and backups/${UPLOADS_ARCHIVE} (also kept on the server at ${REMOTE_DIR}/backups/)"
