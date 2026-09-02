#!/usr/bin/env bash

set -euo pipefail
cd "$(dirname "$0")/.."   # directus/

REMOTE_DIR="~/directus-gf-portfolio"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
DUMP="pull-${TIMESTAMP}.dump"

echo "Dumping production Postgres database..."
ssh myserver "cd ${REMOTE_DIR} && sudo docker compose exec -T postgres sh -c 'pg_dump -U \"\$POSTGRES_USER\" -d \"\$POSTGRES_DB\" -F c'" > "/tmp/${DUMP}"

echo "Ensuring local Postgres is running..."
docker compose up -d postgres
for i in $(seq 1 15); do
  h=$(docker inspect --format='{{.State.Health.Status}}' directus-postgres-1 2>/dev/null || echo "")
  [ "$h" = "healthy" ] && break
  sleep 2
done

echo "Stopping local Directus (if running), to avoid restoring under an active connection..."
docker compose stop directus 2>/dev/null || true

echo "Resetting local database and restoring production dump..."
set -a; source .env; set +a
docker exec directus-postgres-1 psql -U "${DB_USER}" -d "${DB_DATABASE}" -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
docker cp "/tmp/${DUMP}" directus-postgres-1:/tmp/restore.dump
docker exec directus-postgres-1 pg_restore -U "${DB_USER}" -d "${DB_DATABASE}" --no-owner --role="${DB_USER}" /tmp/restore.dump
rm -f "/tmp/${DUMP}"

echo "Pulling uploads/ from the server..."
rsync -avz --delete myserver:~/directus-gf-portfolio/uploads/ ./uploads/

echo "Done. Start it with: docker compose up -d"
