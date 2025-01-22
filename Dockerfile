# Usar la imagen oficial de Node.js
FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar archivos necesarios
COPY package.json package-lock.json ./
RUN npm install

# Copiar todo el código
COPY . .

# Exponer el puerto de desarrollo
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "dev"]
