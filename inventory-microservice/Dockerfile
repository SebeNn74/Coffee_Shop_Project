FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Compila el proyecto TypeScript a JavaScript
RUN npm run build

# Expón el puerto del servidor
EXPOSE 3000

# Ejecuta el archivo compilado
CMD ["node", "dist/server.js"]
