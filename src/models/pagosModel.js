import { db } from "../config/db.js";

/** Inserta un nuevo pago */
export async function crearPago(nombre, monto) {
  const [res] = await db.execute(
    `INSERT INTO pagos (nombre, monto) VALUES (?, ?)`,
    [nombre, monto]
  );
  return res.insertId;
}

/** Lista pagos de HOY */
export async function obtenerPagosHoy() {
  const [rows] = await db.execute(
    `SELECT id, nombre, monto, fecha
     FROM pagos
     WHERE DATE(fecha) = CURDATE()
     ORDER BY fecha DESC`
  );
  return rows;
}
