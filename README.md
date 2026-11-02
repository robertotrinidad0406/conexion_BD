# API con Express y PostgreSQL

## Requisitos

- Node.js
- PostgreSQL

## Configuración

1. Instala las dependencias con `npm install`.
2. Copia `.env.example` como `.env` y completa los datos de tu base de datos.
3. Inicia el servidor con `npm start`.

La API queda disponible en `http://localhost:3000` (o en el puerto indicado en `PORT`).

## Rutas iniciales

- `GET /`: confirma que la API está funcionando.
- `GET /health`: comprueba que el servidor responde.
- `GET /health/db`: ejecuta `SELECT 1` para comprobar la conexión a PostgreSQL.

Las rutas y tablas específicas del ejercicio se pueden agregar cuando esté definido el esquema de la base de datos.
