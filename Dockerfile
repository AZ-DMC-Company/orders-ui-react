# syntax=docker/dockerfile:1

# --- Etapa 1: compilar la SPA ---
FROM node:22-bookworm-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# --- Etapa 2: servir estáticos ---
FROM nginx:alpine AS runtime

COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/bodegafront/browser /usr/share/nginx/html
COPY src/assets/config.json /usr/share/nginx/html/assets/config.json
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 8080

ENTRYPOINT ["/entrypoint.sh"]