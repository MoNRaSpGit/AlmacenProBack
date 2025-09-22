import { db } from "../config/db.js";

// Abrir caja nueva
export async function abrirCaja(montoInicial, descripcion = null) {
  const [result] = await db.execute(
    "INSERT INTO caja_sesiones (monto_inicial, monto_final, descripcion) VALUES (?, NULL, ?)",
    [montoInicial, descripcion]
  );
  return result.insertId;
}

// Registrar movimiento (venta/pago/egreso)
export async function registrarMovimiento(sesionId, monto, tipo, descripcion = null) {
  const [result] = await db.execute(
    "INSERT INTO caja_movimientos (sesion_id, monto, tipo, descripcion) VALUES (?, ?, ?, ?)",
    [sesionId, monto, tipo, descripcion]
  );
  return result.insertId;
}

// Obtener saldo actual de una sesión
export async function obtenerSaldo(sesionId) {
  const [[row]] = await db.execute(
    `SELECT s.id,
            s.monto_inicial,
            COALESCE(SUM(CASE WHEN m.tipo='venta' THEN m.monto ELSE -m.monto END),0) AS movimientos,
            s.monto_inicial + COALESCE(SUM(CASE WHEN m.tipo='venta' THEN m.monto ELSE -m.monto END),0) AS saldo_actual
     FROM caja_sesiones s
     LEFT JOIN caja_movimientos m ON m.sesion_id = s.id
     WHERE s.id = ?
     GROUP BY s.id`,
    [sesionId]
  );
  return row;
}

// Obtener lista de movimientos de una sesión
export async function obtenerMovimientos(sesionId) {
  const [rows] = await db.execute(
    "SELECT id, monto, tipo, descripcion, fecha FROM caja_movimientos WHERE sesion_id = ? ORDER BY fecha DESC",
    [sesionId]
  );
  return rows;
}

// Cerrar caja (guardar monto final y fecha_cierre)
export async function cerrarCaja(sesionId, montoFinal) {
  await db.execute(
    "UPDATE caja_sesiones SET monto_final = ?, fecha_cierre = NOW() WHERE id = ?",
    [montoFinal, sesionId]
  );
}
