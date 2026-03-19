# Stage 1: Build
FROM node:18-alpine AS build
WORKDIR /app

# Copiar package.json primero para cache de dependencias
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copiar resto del proyecto
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copiar build de Angular
COPY --from=build /app/dist/orders-frontend /usr/share/nginx/html

# Copiar template de variables de entorno
COPY src/assets/env.template.js /usr/share/nginx/html/assets/env.template.js

# Exponer puerto
EXPOSE 80

# Generar env.js dinámico y arrancar Nginx
CMD sh -c "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && nginx -g 'daemon off;'"