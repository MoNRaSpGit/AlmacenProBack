import { db } from "../config/db.js"; // 👈 Faltaba esta línea

import {
  abrirCaja,
  obtenerCajaActiva,
  actualizarCaja,
  cerrarCajaDB,
  registrarMovimiento,
  obtenerMovimientosCajaActiva,
  obtenerHistorialCajas,
} from "../models/cajaModel.js";

import { crearPago } from "../models/pagosModel.js";

// POST /api/caja/abrir
export async function abrir(req, res) {
  try {
    const { montoInicial } = req.body;
    const id = await abrirCaja(Number(montoInicial));
    const caja = await obtenerCajaActiva();
    res.json({ message: "Caja abierta", id, caja });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET /api/caja/activa
export async function verActiva(_req, res) {
  try {
    const caja = await obtenerCajaActiva();
    if (!caja) {
      return res.status(404).json({ message: "No hay caja activa" });
    }
    res.json(caja);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// POST /api/caja/venta
export async function venta(req, res) {
  try {
    const { monto, productos } = req.body; // productos: [{ id, cantidad, precio }]
    const [mov] = await db.execute(
      `INSERT INTO movimientos (tipo, descripcion, monto, caja_id)
       VALUES ('ingreso', 'Venta', ?, (SELECT id FROM cajaAlmacen WHERE activa = 1 LIMIT 1))`,
      [monto]
    );

    const movimientoId = mov.insertId;

    // Guardamos detalle
    if (productos?.length) {
      for (const p of productos) {
        await db.execute(
          `INSERT INTO ventas_detalle (movimiento_id, producto_id, cantidad, precio_unitario)
           VALUES (?, ?, ?, ?)`,
          [movimientoId, p.id, p.cantidad, p.precio]
        );
      }
    }

    // Actualizamos caja
    await db.execute(
      `UPDATE cajaAlmacen SET monto_total = monto_total + ? WHERE activa = 1`,
      [monto]
    );

    res.json({ message: "Venta registrada", id: movimientoId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// POST /api/caja/pago
export async function pago(req, res) {
  try {
    const { nombre, monto } = req.body;
    if (!nombre || !monto) {
      return res.status(400).json({ error: "nombre y monto son obligatorios" });
    }

    const id = await actualizarCaja(-Number(monto));
    if (!id) return res.status(400).json({ error: "No hay caja activa" });

    await crearPago(nombre, Number(monto));
    await registrarMovimiento("egreso", nombre, Number(monto));

    const caja = await obtenerCajaActiva();
    res.json({ message: "Pago registrado", caja });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET /api/caja/movimientos
export async function listarMovimientos(_req, res) {
  try {
    const movimientos = await obtenerMovimientosCajaActiva();
    res.json(movimientos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// POST /api/caja/cerrar
export async function cerrar(_req, res) {
  try {
    const id = await cerrarCajaDB();
    if (!id) return res.status(400).json({ error: "No hay caja activa" });

    res.json({ message: "Caja cerrada", id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET /api/caja/historial
export async function historial(req, res) {
  try {
    const { fecha } = req.query; // opcional ?fecha=2025-10-11
    const data = await obtenerHistorialCajas(fecha);
    res.json(data);
  } catch (err) {
    console.error("❌ Error al obtener historial de cajas:", err);
    res.status(500).json({ error: err.message });
  }
}
