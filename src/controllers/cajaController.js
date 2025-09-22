import {
  abrirCaja,
  registrarMovimiento,
  obtenerSaldo,
  obtenerMovimientos,
  cerrarCaja,
} from "../models/cajaModel.js";

// POST /api/caja/abrir
export async function abrir(req, res) {
  try {
    const { montoInicial, descripcion } = req.body;
    const id = await abrirCaja(montoInicial, descripcion);
    res.json({ message: "Caja abierta", id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// POST /api/caja/venta
export async function venta(req, res) {
  try {
    const { sesionId, monto, descripcion } = req.body;
    const id = await registrarMovimiento(sesionId, monto, "venta", descripcion);
    res.json({ message: "Venta registrada", id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// POST /api/caja/pago
export async function pago(req, res) {
  try {
    const { sesionId, monto, descripcion } = req.body;
    const id = await registrarMovimiento(sesionId, monto, "pago", descripcion);
    res.json({ message: "Pago registrado", id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET /api/caja/saldo/:sesionId
export async function saldo(req, res) {
  try {
    const sesionId = req.params.sesionId;
    const data = await obtenerSaldo(sesionId);
    const movimientos = await obtenerMovimientos(sesionId);
    res.json({ ...data, movimientos });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// POST /api/caja/cerrar
export async function cerrar(req, res) {
  try {
    const { sesionId, montoFinal } = req.body;
    await cerrarCaja(sesionId, montoFinal);
    res.json({ message: "Caja cerrada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
