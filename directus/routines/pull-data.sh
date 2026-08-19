#!/usr/bin/env bash

set -euo pipefail
cd "$(dirname "$0")/.."

echo "Stopping local Directus container (if running), to avoid syncing over an open SQLite file..."
docker compose down 2>/dev/null || true

echo "Pulling database/ from the server..."
rsync -avz --delete myserver:~/directus-gf-portfolio/database/ ./database/

echo "Pulling uploads/ from the server..."
rsync -avz --delete myserver:~/directus-gf-portfolio/uploads/ ./uploads/

echo "Done. Start it with: docker compose up -d"
