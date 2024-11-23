deps:
	cp packages/prisma/.env.example packages/prisma/.env
	rm -rf node_modules && rm -rf pnpm-lock.yaml && pnpm install
	
run:
	pnpm -F @apps/hono_zod_openapi dev

# Prisma
dbrm:
	rm -rf packages/prisma/migrations
	rm -rf packages/prisma/dev.db

migrate:
	rm -rf packages/prisma/dev.db
	pnpm -F @packages/prisma migrate

generate:
	pnpm -F @packages/prisma generate