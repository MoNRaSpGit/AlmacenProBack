// src/config/db.js
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: "-03:00", // Ajusta interpretación en Node
});

try {
  const connection = await db.getConnection();
  await connection.query("SET time_zone = '-03:00'"); // 👈 Fuerza la sesión MySQL
  connection.release();
  console.log("🕒 Zona horaria configurada a UTC-3 (Uruguay)");
} catch (err) {
  console.error("❌ Error configurando zona horaria:", err.message);
}
