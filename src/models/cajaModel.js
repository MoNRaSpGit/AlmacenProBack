import { db } from "../config/db.js";

// Abrir caja
export async function abrirCaja(montoInicial) {
  const [res] = await db.execute(
    `INSERT INTO cajaAlmacen (fecha, monto_inicial, monto_total, activa)
     VALUES (CURDATE(), ?, ?, 1)`,
    [montoInicial, montoInicial]
  );
  return res.insertId;
}

// Obtener la caja activa
export async function obtenerCajaActiva() {
  const [rows] = await db.execute(
    `SELECT * FROM cajaAlmacen WHERE activa = 1 LIMIT 1`
  );
  return rows[0];
}

// Actualizar caja (suma o resta)
export async function actualizarCaja(monto) {
  const [res] = await db.execute(
    `UPDATE cajaAlmacen
     SET monto_total = monto_total + ?
     WHERE activa = 1`,
    [monto]
  );
  return res.affectedRows;
}

// Cerrar caja
export async function cerrarCajaDB() {
  const [res] = await db.execute(
    `UPDATE cajaAlmacen SET activa = 0 WHERE activa = 1`
  );
  return res.affectedRows;
}
