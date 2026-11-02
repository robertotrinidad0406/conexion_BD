import "dotenv/config";
import app from "./src/app.js";
import pool from "./src/db.js";

const port = Number(process.env.PORT || 3000);
const server = app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});

const shutdown = () => {
  server.close((error) => {
    if (error) {
      console.error("Error al cerrar el servidor:", error);
      process.exitCode = 1;
    }

    pool
      .end()
      .then(() => process.exit())
      .catch((poolError) => {
        console.error("Error al cerrar el pool de PostgreSQL:", poolError);
        process.exitCode = 1;
        process.exit();
      });
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
