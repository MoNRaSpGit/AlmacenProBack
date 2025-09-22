import { db } from "../config/db.js";

// Abrir caja
export async function abrirCaja(montoInicial) {
  const [result] = await db.execute(
    "INSERT INTO caja (monto_inicial, monto_total, estado) VALUES (?, ?, 'abierta')",
    [montoInicial, montoInicial]
  );
  return result.insertId;
}

// Obtener caja activa
export async function obtenerCajaActiva() {
  const [[row]] = await db.execute(
    "SELECT * FROM caja WHERE estado = 'abierta' ORDER BY fecha DESC LIMIT 1"
  );
  return row;
}

// Actualizar caja (sumar/restar monto)
export async function actualizarCaja(monto) {
  const caja = await obtenerCajaActiva();
  if (!caja) return null;

  await db.execute(
    "UPDATE caja SET monto_total = monto_total + ? WHERE id = ?",
    [monto, caja.id]
  );

  return caja.id;
}

// Cerrar caja
export async function cerrarCaja() {
  const caja = await obtenerCajaActiva();
  if (!caja) return null;

  await db.execute(
    "UPDATE caja SET estado = 'cerrada' WHERE id = ?",
    [caja.id]
  );

  return caja.id;
}
