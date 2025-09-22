import { db } from "../config/db.js";

// Abrir caja (crear nueva activa)
export async function abrirCaja(montoInicial) {
  const [result] = await db.execute(
    "INSERT INTO caja (fecha, monto_inicial, monto_total, activa) VALUES (CURDATE(), ?, ?, 1)",
    [montoInicial, montoInicial]
  );
  return result.insertId;
}

// Obtener caja activa
export async function obtenerCajaActiva() {
  const [[row]] = await db.execute(
    "SELECT * FROM caja WHERE activa = 1 ORDER BY id DESC LIMIT 1"
  );
  return row;
}

// Actualizar monto (suma o resta)
export async function actualizarCaja(delta) {
  const [result] = await db.execute(
    "UPDATE caja SET monto_total = monto_total + ? WHERE activa = 1",
    [delta]
  );
  return result.affectedRows;
}

// Cerrar caja
export async function cerrarCaja() {
  const [result] = await db.execute(
    "UPDATE caja SET activa = 0 WHERE activa = 1"
  );
  return result.affectedRows;
}
