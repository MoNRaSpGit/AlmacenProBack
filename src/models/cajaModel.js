import { db } from "../config/db.js";

/**
 * Devuelve la fila de caja de HOY (o undefined si no existe)
 */
export async function obtenerCajaHoy() {
  const [[row]] = await db.execute(
    "SELECT * FROM caja WHERE fecha = CURDATE() LIMIT 1"
  );
  return row;
}

/**
 * Inicia la caja de HOY. Si ya existe, la sobreescribe (setea inicial y total al mismo valor)
 */
export async function iniciarCaja(montoInicial) {
  const existente = await obtenerCajaHoy();
  if (existente) {
    await db.execute(
      "UPDATE caja SET monto_inicial = ?, monto_total = ? WHERE id = ?",
      [montoInicial, montoInicial, existente.id]
    );
    return existente.id;
  } else {
    const [res] = await db.execute(
      "INSERT INTO caja (fecha, monto_inicial, monto_total) VALUES (CURDATE(), ?, ?)",
      [montoInicial, montoInicial]
    );
    return res.insertId;
  }
}

/**
 * Suma o resta al monto_total de HOY. Devuelve affectedRows para saber si ya estaba iniciada.
 * delta > 0 => suma (venta)
 * delta < 0 => resta (pago)
 */
export async function actualizarCaja(delta) {
  const [res] = await db.execute(
    "UPDATE caja SET monto_total = monto_total + ? WHERE fecha = CURDATE()",
    [delta]
  );
  return res.affectedRows; // 0 si no hay caja iniciada
}
