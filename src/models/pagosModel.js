import { db } from "../config/db.js";

export async function crearPago(nombre, monto) {
  const [result] = await db.execute(
    "INSERT INTO pagos (nombre, monto) VALUES (?, ?)",
    [nombre, monto]
  );
  return result.insertId;
}

export async function obtenerPagos() {
  const [rows] = await db.execute("SELECT * FROM pagos ORDER BY fecha DESC");
  return rows;
}
