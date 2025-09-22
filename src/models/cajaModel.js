import { db } from "../config/db.js";

// Iniciar caja del día
export async function iniciarCaja(montoInicial) {
  const [result] = await db.execute(
    "INSERT INTO caja (fecha, monto_inicial, monto_total) VALUES (CURDATE(), ?, ?)",
    [montoInicial, montoInicial]
  );
  return result.insertId;
}

// Obtener saldo del día actual
export async function obtenerCajaHoy() {
  const [[row]] = await db.execute(
    "SELECT * FROM caja WHERE fecha = CURDATE() LIMIT 1"
  );
  return row;
}

// Registrar venta (sumar al total)
export async function registrarVenta(monto) {
  await db.execute(
    "UPDATE caja SET monto_total = monto_total + ? WHERE fecha = CURDATE()",
    [monto]
  );
}

// Registrar pago a proveedor (restar al total)
export async function registrarPago(monto) {
  await db.execute(
    "UPDATE caja SET monto_total = monto_total - ? WHERE fecha = CURDATE()",
    [monto]
  );
}

// Descontar o sumar a la caja
export async function actualizarCaja(delta) {
  await db.execute("UPDATE caja SET monto_total = monto_total + ?", [delta]);
}

