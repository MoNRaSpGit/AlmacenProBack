import { db } from "../config/db.js";

// 📌 Abrir una nueva caja
export async function abrirCaja(montoInicial) {
  const [result] = await db.execute(
    "INSERT INTO caja (fecha, monto_inicial, monto_total, activa) VALUES (CURDATE(), ?, ?, 1)",
    [montoInicial, montoInicial]
  );
  return result.insertId;
}

// 📌 Obtener la caja activa
export async function obtenerCajaActiva() {
  const [[row]] = await db.execute(
    "SELECT id, fecha, monto_inicial, monto_total, activa FROM caja WHERE activa = 1 ORDER BY id DESC LIMIT 1"
  );
  return row;
}

// 📌 Actualizar el saldo de la caja (suma/resta al monto_total)
export async function actualizarCaja(monto) {
  const [result] = await db.execute(
    "UPDATE caja SET monto_total = monto_total + ? WHERE activa = 1",
    [monto]
  );
  return result.affectedRows;
}

// 📌 Cerrar la caja (poner activa = 0)
export async function cerrarCaja() {
  const [result] = await db.execute(
    "UPDATE caja SET activa = 0 WHERE activa = 1"
  );
  return result.affectedRows;
}
