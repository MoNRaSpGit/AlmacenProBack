import {
  iniciarCaja,
  obtenerCajaHoy,
  registrarVenta,
  registrarPago,
} from "../models/cajaModel.js";

// POST /api/caja/iniciar
export async function iniciar(req, res) {
  try {
    const { montoInicial } = req.body;
    const id = await iniciarCaja(montoInicial);
    res.json({ message: "Caja iniciada", id, montoInicial });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET /api/caja
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

// POST /api/caja/venta
export async function venta(req, res) {
  try {
    const { monto } = req.body;
    await registrarVenta(monto);
    res.json({ message: "Venta registrada", monto });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// POST /api/caja/pago
export async function pago(req, res) {
  try {
    const { monto } = req.body;
    await registrarPago(monto);
    res.json({ message: "Pago registrado", monto });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
