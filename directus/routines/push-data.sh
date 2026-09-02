#!/usr/bin/env bash

set -euo pipefail
cd "$(dirname "$0")/.."   # directus/

REMOTE_DIR="~/directus-gf-portfolio"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
DUMP="push-${TIMESTAMP}.dump"

echo "Dumping local Postgres database..."
set -a; source .env; set +a
docker exec directus-postgres-1 pg_dump -U "${DB_USER}" -d "${DB_DATABASE}" -F c > "/tmp/${DUMP}"

echo "Uploading dump to server..."
scp "/tmp/${DUMP}" "myserver:/tmp/${DUMP}"
rm -f "/tmp/${DUMP}"

echo "Stopping production Directus (if running), to avoid restoring under an active connection..."
ssh myserver "cd ${REMOTE_DIR} && sudo docker compose stop directus" || true

echo "Resetting production database and restoring local dump..."
ssh myserver "cd ${REMOTE_DIR} && sudo docker compose exec -T postgres psql -U directus -d directus -c 'DROP SCHEMA public CASCADE; CREATE SCHEMA public;'"
ssh myserver "sudo docker cp /tmp/${DUMP} directus-gf-portfolio-postgres-1:/tmp/restore.dump"
ssh myserver "cd ${REMOTE_DIR} && sudo docker compose exec -T postgres pg_restore -U directus -d directus --no-owner --role=directus /tmp/restore.dump"
ssh myserver "rm -f /tmp/${DUMP}"

echo "Pushing uploads/ to the server..."
rsync -avz --delete ./uploads/ myserver:~/directus-gf-portfolio/uploads/

echo "Restarting production Directus..."
ssh myserver "cd ${REMOTE_DIR} && sudo docker compose up -d directus"

echo "Done. Local projects, content_blocks, and uploads pushed to production."
