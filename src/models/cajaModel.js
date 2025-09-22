import { db } from "../config/db.js";

// 👉 Abrir caja
export async function abrirCaja(montoInicial) {
  const [res] = await db.execute(
    `INSERT INTO cajaAlmacen (monto_inicial, monto_total, activa)
     VALUES (?, ?, 1)`,
    [montoInicial, montoInicial]
  );
  return res.insertId;
}

// 👉 Obtener caja activa
export async function obtenerCajaActiva() {
  const [rows] = await db.execute(
    `SELECT * FROM cajaAlmacen WHERE activa = 1 ORDER BY id DESC LIMIT 1`
  );
  return rows[0] || null;
}

// 👉 Actualizar caja (sumar/restar saldo)
export async function actualizarCaja(monto) {
  const [res] = await db.execute(
    `UPDATE cajaAlmacen SET monto_total = monto_total + ? 
     WHERE activa = 1`,
    [monto]
  );
  return res.affectedRows;
}

// 👉 Cerrar caja
export async function cerrarCajaDB() {
  const [res] = await db.execute(
    `UPDATE cajaAlmacen SET activa = 0 WHERE activa = 1`
  );
  return res.affectedRows;
}

// 👉 Registrar movimiento
export async function registrarMovimiento(tipo, descripcion, monto) {
  const [res] = await db.execute(
    `INSERT INTO movimientos (tipo, descripcion, monto) VALUES (?, ?, ?)`,
    [tipo, descripcion, monto]
  );
  return res.insertId;
}

// 👉 Obtener movimientos de HOY
export async function obtenerMovimientosHoy() {
  const [rows] = await db.execute(
    `SELECT id, tipo, descripcion, monto, fecha
     FROM movimientos
     WHERE DATE(fecha) = CURDATE()
     ORDER BY fecha DESC`
  );
  return rows;
}
