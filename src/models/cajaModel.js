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
  // buscar caja activa
  const [cajaRows] = await db.execute(
    `SELECT id FROM cajaAlmacen WHERE activa = 1 ORDER BY id DESC LIMIT 1`
  );
  const cajaActiva = cajaRows[0];
  if (!cajaActiva) {
    console.warn("⚠️ No hay caja activa, no se registró el movimiento");
    return null;
  }

  // registrar movimiento vinculado a esa caja
  const [res] = await db.execute(
    `INSERT INTO movimientos (tipo, descripcion, monto, caja_id)
     VALUES (?, ?, ?, ?)`,
    [tipo, descripcion, monto, cajaActiva.id]
  );
  return res.insertId;
}


// 👉 Obtener movimientos de HOY
export async function obtenerMovimientosCajaActiva() {
  const [cajaRows] = await db.execute(
    `SELECT id FROM cajaAlmacen WHERE activa = 1 ORDER BY id DESC LIMIT 1`
  );
  const cajaActiva = cajaRows[0];
  if (!cajaActiva) return [];

  const [rows] = await db.execute(
    `SELECT id, tipo, descripcion, monto, fecha
     FROM movimientos
     WHERE caja_id = ?
     ORDER BY fecha DESC`,
    [cajaActiva.id]
  );
  return rows;
}

export async function obtenerHistorialCajas(fecha = null) {
  let query = `
    SELECT c.id, c.fecha, c.turno, c.monto_inicial, c.monto_total, c.activa,
           COUNT(m.id) AS cantidad_movimientos,
           SUM(CASE WHEN m.tipo = 'ingreso' THEN m.monto ELSE 0 END) AS total_ingresos,
           SUM(CASE WHEN m.tipo = 'egreso' THEN m.monto ELSE 0 END) AS total_egresos
    FROM cajaAlmacen c
    LEFT JOIN movimientos m ON c.id = m.caja_id
  `;
  const params = [];

  if (fecha) {
    query += " WHERE c.fecha = ?";
    params.push(fecha);
  }

  query += " GROUP BY c.id ORDER BY c.fecha DESC, c.id DESC";

  const [rows] = await db.execute(query, params);
  return rows;
}


