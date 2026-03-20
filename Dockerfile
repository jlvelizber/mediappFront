FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
ARG NEXT_PUBLIC_API_URL=""
ARG NEXT_PUBLIC_PUBLIC_URL=""
ARG NEXT_PUBLIC_TITLE=""
RUN if [ -n "$NEXT_PUBLIC_API_URL" ]; then export NEXT_PUBLIC_API_URL="$NEXT_PUBLIC_API_URL"; fi; \
    if [ -n "$NEXT_PUBLIC_PUBLIC_URL" ]; then export NEXT_PUBLIC_PUBLIC_URL="$NEXT_PUBLIC_PUBLIC_URL"; fi; \
    if [ -n "$NEXT_PUBLIC_TITLE" ]; then export NEXT_PUBLIC_TITLE="$NEXT_PUBLIC_TITLE"; fi; \
    npm run build

FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/package.json /app/package-lock.json* ./
RUN npm ci --omit=dev && npm cache clean --force
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.* ./

EXPOSE 3000

CMD ["npm", "run", "start", "--", "--hostname", "0.0.0.0", "--port", "3000"]
