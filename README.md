# ☕ Coffee Shop Project - Microservicios

Sistema de gestión para cafetería implementado con arquitectura de microservicios usando Node.js, TypeScript, Express y MySQL.

## 📋 Tabla de Contenidos

- [Arquitectura](#-arquitectura)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#%EF%B8%8F-configuración)
- [Ejecución](#-ejecución)
- [API Endpoints](#-api-endpoints)
- [Flujo de Venta Integrado](#-flujo-de-venta-integrado)
- [Pruebas](#-pruebas)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Tecnologías](#-tecnologías)

## 🏗️ Arquitectura

El proyecto está compuesto por 4 microservicios independientes:

```
┌─────────────────┐
│     Nginx       │  (Puerto 80 - Load Balancer)
│  Reverse Proxy  │
└────────┬────────┘
         │
    ┌────┴────┬─────────┬──────────┐
    │         │         │          │
┌───▼────┐ ┌─▼──────┐ ┌▼────────┐ ┌▼────────┐
│ Users  │ │Customer│ │Inventory│ │ Sales   │
│Service │ │Service │ │ Service │ │ Service │
│ :3001  │ │ :3002  │ │  :3003  │ │ :3004   │
└───┬────┘ └─┬──────┘ └┬────────┘ └┬────────┘
    │        │         │           │
    └────────┴─────────┴───────────┘
                  │
         ┌────────▼─────────┐
         │   MySQL 8.0      │
         │   coffee_shop_db │
         │     :3306        │
         └──────────────────┘
```

### Microservicios

- **users-microservice** (Puerto 3001): Gestión de usuarios y autenticación
- **customers-microservice** (Puerto 3002): Gestión de clientes y puntos de lealtad
- **inventory-microservice** (Puerto 3003): Gestión de productos y stock
- **sales-microservice** (Puerto 3004): Gestión de ventas con orquestación de microservicios

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Docker** (versión 20.0 o superior)
- **Docker Compose** (versión 2.0 o superior)
- **Node.js** (versión 18 o superior) - solo para desarrollo local
- **npm** (versión 8 o superior) - solo para desarrollo local
- **Git**

### Verificar instalación

```bash
docker --version
docker-compose --version
node --version
npm --version
```

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/SebeNn74/Coffee_Shop_Project.git
cd Coffee_Shop_Project
```

### 2. Instalar dependencias de cada microservicio

```bash
# Users microservice
cd users-microservice
npm install
cd ..

# Customers microservice
cd customers-microservice
npm install
cd ..

# Inventory microservice
cd inventory-microservice
npm install
cd ..

# Sales microservice
cd sales-microservice
npm install
cd ..
```

## ⚙️ Configuración

### Archivos .env

Cada microservicio necesita su archivo `.env`:

#### **users-microservice/.env**
```env
DB_HOST=coffee_shop_mysql
DB_PORT=3306
DB_USER=admin
DB_PASSWORD=admin123
DB_NAME=coffee_shop_db
PORT=3001
JWT_SECRET=your_jwt_secret_key_here
```

#### **customers-microservice/.env**
```env
DB_HOST=coffee_shop_mysql
DB_PORT=3306
DB_USER=admin
DB_PASSWORD=admin123
DB_NAME=coffee_shop_db
PORT=3002
```

#### **inventory-microservice/.env**
```env
DB_HOST=coffee_shop_mysql
DB_PORT=3306
DB_USER=admin
DB_PASSWORD=admin123
DB_NAME=coffee_shop_db
PORT=3003
```

#### **sales-microservice/.env**
```env
DB_HOST=coffee_shop_mysql
DB_PORT=3306
DB_USER=admin
DB_PASSWORD=admin123
DB_NAME=coffee_shop_db
PORT=3004
CUSTOMERS_SERVICE_URL=http://customers-service:3002
INVENTORY_SERVICE_URL=http://inventory-service:3003
```

## 🎯 Ejecución

### Usando Docker Compose (Recomendado)

```bash
# Construir y levantar todos los servicios
docker-compose up --build

# O en modo detached (background)
docker-compose up -d --build

# Ver logs en tiempo real
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f sales-service
```

### Detener los servicios

```bash
# Detener servicios
docker-compose down

# Detener y eliminar volúmenes (limpia la BD)
docker-compose down -v
```

### Verificar que los servicios están corriendo

```bash
docker-compose ps
```

Deberías ver algo como:

```
NAME                    STATUS              PORTS
coffee_shop_mysql       Up (healthy)        0.0.0.0:3306->3306/tcp
coffee_shop_nginx       Up                  0.0.0.0:80->80/tcp
users-service           Up                  3001/tcp
customers-service       Up                  3002/tcp
inventory-service       Up                  3003/tcp
sales-service           Up                  3004/tcp
```

## 📡 API Endpoints

Todas las peticiones pasan por Nginx en `http://localhost`

### Users Service (`/users`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/users/` | Obtener todos los usuarios |
| GET | `/users/:id` | Obtener usuario por ID |
| POST | `/users/` | Crear nuevo usuario |
| POST | `/users/login` | Autenticación de usuario |
| DELETE | `/users/:id` | Eliminar usuario |

### Customers Service (`/customers`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/customers/` | Obtener todos los clientes |
| GET | `/customers/:id` | Obtener cliente por ID |
| POST | `/customers/` | Crear nuevo cliente |
| PUT | `/customers/:id` | Actualizar cliente |
| PATCH | `/customers/:id/add-points` | Agregar puntos de lealtad |
| DELETE | `/customers/:id` | Eliminar cliente |

### Inventory Service (`/products`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/products/` | Obtener todos los productos |
| GET | `/products/:id` | Obtener producto por ID |
| POST | `/products/` | Crear nuevo producto |
| PUT | `/products/:id` | Actualizar producto |
| PATCH | `/products/:id/decrease-stock` | Disminuir stock de producto |
| DELETE | `/products/:id` | Eliminar producto |

### Sales Service (`/sales`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/sales/` | Obtener todas las ventas |
| GET | `/sales/:id` | Obtener venta por ID |
| POST | `/sales/` | Crear nueva venta (flujo integrado) |
| PUT | `/sales/:id` | Actualizar venta |
| DELETE | `/sales/:id` | Eliminar venta |

## 🔄 Flujo de Venta Integrado

Cuando se crea una venta, el sistema ejecuta automáticamente estos pasos:

```
1. Validar datos de entrada (user_id, customer_id, items)
2. Verificar que el customer existe (llamada a customers-service)
3. Verificar stock disponible de cada producto (llamada a inventory-service)
4. Disminuir stock de productos (llamada a inventory-service)
5. Registrar la venta en la base de datos
6. Registrar los items de la venta
7. Agregar puntos de lealtad al cliente (llamada a customers-service)
   - Fórmula: 1 punto por cada $1000 de compra
```

## 🧪 Pruebas

### Healthcheck

```bash
# Verificar que Nginx está funcionando
curl http://localhost/_nginx_health
# Respuesta: ok

# Verificar mensaje de bienvenida
curl http://localhost/
# Respuesta: {"message":"Bienvenido a Coffee_Shop_API"}
```

### Crear datos de prueba

#### 1. Crear un usuario

```bash
curl -X POST http://localhost/users/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123",
    "email": "admin@coffee.com"
  }'
```

#### 2. Crear un cliente

```bash
curl -X POST http://localhost/customers/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "phone": "1234567890",
    "email": "juan@example.com",
    "loyaltyPoints": 0
  }'
```

#### 3. Crear productos

```bash
# Café Americano
curl -X POST http://localhost/products/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Café Americano",
    "description": "Café negro clásico",
    "price": 3000,
    "category": "Bebidas Calientes",
    "quantity": 100
  }'

# Croissant
curl -X POST http://localhost/products/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Croissant",
    "description": "Croissant de mantequilla",
    "price": 4000,
    "category": "Panadería",
    "quantity": 50
  }'
```

#### 4. Crear una venta (Flujo completo)

```bash
curl -X POST http://localhost/sales/ \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1,
    "customer_id": 1,
    "items": [
      {
        "product_id": 1,
        "quantity": 2,
        "unitPrice": 3000,
        "discount": 0
      },
      {
        "product_id": 2,
        "quantity": 1,
        "unitPrice": 4000,
        "discount": 500
      }
    ]
  }'
```

**Respuesta esperada:**
```json
{
  "id": 1,
  "user_id": 1,
  "customer_id": 1,
  "totalAmount": 9500,
  "status": "completed",
  "createdAt": "2024-11-18T..."
}
```

#### 5. Verificar resultados

```bash
# Ver el cliente con puntos actualizados
curl http://localhost/customers/1
# loyaltyPoints debería ser 9 (9500 / 1000 = 9 puntos)

# Ver stock actualizado del producto 1
curl http://localhost/products/1
# quantity debería ser 98 (100 - 2)

# Ver la venta con sus items
curl http://localhost/sales/1
```

### Probar endpoint de disminuir stock

```bash
curl -X PATCH http://localhost/products/1/decrease-stock \
  -H "Content-Type: application/json" \
  -d '{"quantity": 5}'
```

### Probar endpoint de agregar puntos

```bash
curl -X PATCH http://localhost/customers/1/add-points \
  -H "Content-Type: application/json" \
  -d '{"points": 50}'
```

## 📁 Estructura del Proyecto

```
Coffee_Shop_Project/
├── docker-compose.yml
├── nginx.conf
├── init.sql
├── README.md
│
├── users-microservice/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── exceptions/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── repositories/
│   │   ├── routers/
│   │   ├── services/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── .env
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
│
├── customers-microservice/
│   └── (estructura similar)
│
├── inventory-microservice/
│   └── (estructura similar)
│
└── sales-microservice/
    └── (estructura similar)
```

### Arquitectura por capas (cada microservicio)

```
┌─────────────────────────────────┐
│        Controllers              │  ← Manejo de HTTP requests
├─────────────────────────────────┤
│         Services                │  ← Lógica de negocio
├─────────────────────────────────┤
│       Repositories              │  ← Acceso a datos
├─────────────────────────────────┤
│      Entities (Sequelize)       │  ← ORM/Modelos de BD
└─────────────────────────────────┘
```

## 🛠️ Tecnologías

### Backend
- **Node.js** 18+ - Runtime de JavaScript
- **TypeScript** 5+ - Superset de JavaScript con tipos
- **Express** 5+ - Framework web
- **Sequelize** 6+ - ORM para MySQL
- **axios** 1.6+ - Cliente HTTP para comunicación entre servicios

### Base de Datos
- **MySQL** 8.0 - Base de datos relacional

### Infraestructura
- **Docker** - Containerización
- **Docker Compose** - Orquestación de contenedores
- **Nginx** 1.25 - Reverse proxy y load balancer

### Autenticación
- **jsonwebtoken** 9+ - JWT para autenticación

## 🐛 Troubleshooting

### Los contenedores no inician

```bash
# Ver logs de todos los servicios
docker-compose logs

# Verificar estado de salud de MySQL
docker-compose ps coffee_shop_mysql

# Si MySQL no está healthy, espera unos segundos más
```

### Error de conexión a la base de datos

```bash
# Verificar que MySQL está saludable
docker-compose ps

# Reiniciar el servicio específico
docker-compose restart sales-service
```

### Puerto 80 ya está en uso

```bash
# Cambiar el puerto en docker-compose.yml
ports:
  - "8080:80"  # Usar puerto 8080 en lugar de 80
```

### Limpiar todo y empezar de cero

```bash
# Detener y eliminar todo
docker-compose down -v

# Eliminar imágenes
docker-compose down --rmi all

# Reconstruir
docker-compose up --build
```

### Ver logs en tiempo real de un servicio

```bash
docker-compose logs -f sales-service
```

## 👥 Equipo
- Desarrollador: Nicolas Acosta
- Desarrollador: Angel Torres
- Desarrollador: Sebastián Niño

