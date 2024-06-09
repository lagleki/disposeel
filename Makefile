RED='\033[0;31m'
NC='\033[0m'

## Run locally
local-up:
	docker network create micronetwork || true
	docker compose -f docker-compose/docker-compose.local.yml  --env-file ./.env --project-name backend up --build -d
local-down:
	docker compose -f docker-compose/docker-compose.local.yml --env-file ./.env --project-name backend down

## for prod
run-up:
	docker network create micronetwork || true
	docker compose -f docker-compose/docker-compose.yml  --env-file ./.env --project-name backend up --build -d
run-down:
	docker compose -f docker-compose/docker-compose.yml --env-file ./.env --project-name backend down
