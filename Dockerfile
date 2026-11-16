FROM node:24-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json ./
# postinstall runs `nuxt prepare`, which needs the source; it runs in the build stage instead.
RUN npm ci --ignore-scripts

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx nuxt prepare && npm run build

# One image for the app and the migrate/seed job (drizzle-kit, tsx),
# so it keeps the TypeScript sources and dev tooling.
FROM base AS runner
ENV NODE_ENV=production
ENV NITRO_PORT=3000
COPY --from=build /app ./
RUN mkdir -p .data/uploads && chown -R node:node .data
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s CMD wget -qO- "http://127.0.0.1:3000/api/health" || exit 1
CMD ["node", ".output/server/index.mjs"]
