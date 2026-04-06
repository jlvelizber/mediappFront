FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
# Build-time only: Next inlines NEXT_PUBLIC_* into the client bundle.
# Pass --build-arg from .env de prod (no uses localhost). En .dockerignore se excluye .env del
# contexto para que no pisen estos valores al hacer npm run build.
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_PUBLIC_URL
ARG NEXT_PUBLIC_TITLE
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_PUBLIC_URL=${NEXT_PUBLIC_PUBLIC_URL}
ENV NEXT_PUBLIC_TITLE=${NEXT_PUBLIC_TITLE}
RUN npm run build

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
