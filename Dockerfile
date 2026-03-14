# Stage 1: build Angular
FROM node:18-alpine AS build

# Configura directorio de trabajo
WORKDIR /app

# Copia solo package.json y package-lock.json primero
COPY package*.json ./

# Actualiza npm y limpia cache para evitar errores
RUN npm install -g npm@9 && npm cache clean --force

# Instala dependencias
RUN npm install --legacy-peer-deps

# Copia el resto del código
COPY . .

# Construye el frontend Angular
RUN npm run build --prod

# Stage 2: serve con Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]