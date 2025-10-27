# Node 18 es la version de Node.js que usaremos
FROM node:18
# WORKDIR es el directorio de trabajo dentro del contenedor
WORKDIR /app
# COPY copia los archivos package.json y package-lock.json al contenedor
COPY package*.json ./
# RUN npm install instala las dependencias del proyecto
RUN npm install
# COPY . . copia todos los archivos del proyecto al contenedor
COPY . .
# EXPOSE expone el puerto 3101
EXPOSE 3101
# CMD especifica el comando para iniciar la aplicación
CMD ["npm", "start"]