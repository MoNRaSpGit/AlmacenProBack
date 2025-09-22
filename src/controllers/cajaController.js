import {
  obtenerCajaHoy,
  iniciarCaja,
  actualizarCaja,
} from "../models/cajaModel.js";
import { crearPago, obtenerPagosHoy } from "../models/pagosModel.js";

/** POST /api/caja/iniciar */
export async function iniciar(req, res) {
  try {
    const { montoInicial } = req.body;
    if (montoInicial === undefined || isNaN(Number(montoInicial))) {
      return res.status(400).json({ error: "montoInicial inválido" });
    }
    const id = await iniciarCaja(Number(montoInicial));
    const caja = await obtenerCajaHoy();
    res.json({ message: "Caja iniciada", id, caja });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/** GET /api/caja */
export async function ver(req, res) {
  try {
    const caja = await obtenerCajaHoy();
    if (!caja) {
      return res.status(404).json({ message: "No se ha iniciado la caja hoy" });
    }
    res.json(caja);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/** POST /api/caja/venta { monto } => suma al total */
export async function venta(req, res) {
  try {
    const { monto } = req.body;
    if (monto === undefined || isNaN(Number(monto))) {
      return res.status(400).json({ error: "monto inválido" });
    }
    const affected = await actualizarCaja(Number(monto));
    if (affected === 0) {
      return res.status(400).json({ error: "Primero iniciá la caja" });
    }
    const caja = await obtenerCajaHoy();
    res.json({ message: "Venta registrada", caja });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/** POST /api/caja/pago { nombre, monto } => crea pago y resta al total */
export async function pago(req, res) {
  try {
    const { nombre, monto } = req.body;
    if (!nombre || monto === undefined || isNaN(Number(monto))) {
      return res.status(400).json({ error: "nombre y monto son obligatorios" });
    }
    const affected = await actualizarCaja(-Number(monto));
    if (affected === 0) {
      return res.status(400).json({ error: "Primero iniciá la caja" });
    }
    const idPago = await crearPago(nombre, Number(monto));
    const caja = await obtenerCajaHoy();
    res.json({ message: "Pago registrado", idPago, caja });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/** GET /api/caja/pagos => lista pagos de HOY */
export async function listarPagos(req, res) {
  try {
    const pagos = await obtenerPagosHoy();
    res.json(pagos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
