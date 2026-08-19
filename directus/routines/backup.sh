#!/usr/bin/env bash

set -euo pipefail
cd "$(dirname "$0")/.."   # directus/

REMOTE_DIR="~/directus-gf-portfolio"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
ARCHIVE="directus-backup-${TIMESTAMP}.tar.gz"
KEEP=5

echo "Stopping production Directus briefly for a consistent backup..."
ssh myserver "cd ${REMOTE_DIR} && sudo docker compose stop"

echo "Creating backup archive on the server..."
ssh myserver "cd ${REMOTE_DIR} && mkdir -p backups && tar -czf backups/${ARCHIVE} database uploads"

echo "Restarting production Directus..."
ssh myserver "cd ${REMOTE_DIR} && sudo docker compose start"

echo "Downloading backup archive to local backups/..."
mkdir -p backups
scp "myserver:${REMOTE_DIR}/backups/${ARCHIVE}" "backups/${ARCHIVE}"

echo "Pruning old backups on the server (keeping last ${KEEP})..."
ssh myserver "cd ${REMOTE_DIR}/backups && ls -t | tail -n +$((KEEP + 1)) | xargs -r rm -f"

echo "Pruning old local backups (keeping last ${KEEP})..."
(cd backups && ls -t | tail -n +$((KEEP + 1)) | xargs -r rm -f)

echo "Done: backups/${ARCHIVE} (also kept on the server at ${REMOTE_DIR}/backups/${ARCHIVE})"
