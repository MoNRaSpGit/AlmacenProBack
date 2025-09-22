import { db } from "../config/db.js";

// Crear pago
export async function crearPago(nombre, monto) {
  const [res] = await db.execute(
    `INSERT INTO pagos (nombre, monto) VALUES (?, ?)`,
    [nombre, monto]
  );
  return res.insertId;
}

// Pagos de HOY
export async function obtenerPagosHoy() {
  const [rows] = await db.execute(
    `SELECT id, nombre, monto, fecha
     FROM pagos
     WHERE DATE(fecha) = CURDATE()
     ORDER BY fecha DESC`
  );
  return rows;
}
