import { db } from "../config/db.js";

export async function abrirCaja(montoInicial) {
  const [result] = await db.execute(
    "INSERT INTO cajaAlmacen (monto_inicial, monto_total) VALUES (?, ?)",
    [montoInicial, montoInicial]
  );
  return result.insertId;
}

export async function obtenerCajaActiva() {
  const [[row]] = await db.execute(
    "SELECT * FROM cajaAlmacen WHERE activa = 1 ORDER BY id DESC LIMIT 1"
  );
  return row;
}

export async function actualizarCaja(monto) {
  const [result] = await db.execute(
    "UPDATE cajaAlmacen SET monto_total = monto_total + ? WHERE activa = 1",
    [monto]
  );
  return result.affectedRows;
}

export async function cerrarCaja() {
  const [result] = await db.execute(
    "UPDATE cajaAlmacen SET activa = 0 WHERE activa = 1"
  );
  return result.affectedRows;
}
