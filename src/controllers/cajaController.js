import {
  abrirCaja,
  obtenerCajaActiva,
  actualizarCaja,
  cerrarCajaDB
} from "../models/cajaModel.js";

import {
  crearPago,
  obtenerPagosHoy
} from "../models/pagosModel.js";

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
export async function verActiva(req, res) {
  try {
    const caja = await obtenerCajaActiva();
    if (!caja) return res.status(404).json({ message: "No hay caja activa" });
    res.json(caja);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// POST /api/caja/venta
export async function venta(req, res) {
  try {
    const { monto } = req.body;
    const id = await actualizarCaja(Number(monto));
    if (!id) return res.status(400).json({ error: "No hay caja activa" });

    const caja = await obtenerCajaActiva();
    res.json({ message: "Venta registrada", caja });
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

    const idPago = await crearPago(nombre, Number(monto));
    const caja = await obtenerCajaActiva();

    res.json({ message: "Pago registrado", idPago, caja });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET /api/caja/pagos (solo hoy)
export async function listarPagos(req, res) {
  try {
    const pagos = await obtenerPagosHoy();
    res.json(pagos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// POST /api/caja/cerrar
export async function cerrar(req, res) {
  try {
    const id = await cerrarCajaDB();
    if (!id) return res.status(400).json({ error: "No hay caja activa" });

    res.json({ message: "Caja cerrada", id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
