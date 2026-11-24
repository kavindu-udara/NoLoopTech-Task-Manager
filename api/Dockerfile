FROM node:24-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma
COPY prisma.config.ts ./
ENV DATABASE_URL="file:./dev.db"
RUN apk add --no-cache python3 make g++ \
    && npm_config_build_from_source=true npm ci
COPY . .

RUN npx prisma generate
RUN npm run build
RUN npm prune --omit=dev

FROM node:24-alpine
WORKDIR /app
RUN apk add --no-cache libstdc++
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma.config.ts ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 3001

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]