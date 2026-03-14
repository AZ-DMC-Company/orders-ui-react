# Stage 1: Build
FROM node:18-alpine AS build
WORKDIR /app

# Copiar solo package.json y package-lock.json primero para aprovechar cache
COPY package*.json ./

# Instalar dependencias incluyendo devDependencies
RUN npm install --legacy-peer-deps

# Copiar el resto del proyecto
COPY . .

# Ejecutar build
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/dist/orders-frontend /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]