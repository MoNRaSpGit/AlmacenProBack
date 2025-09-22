import { crearPago, obtenerPagos } from "../models/pagosModel.js";
import { actualizarCaja } from "../models/cajaModel.js";

// POST /api/pagos
export async function registrarPago(req, res) {
  try {
    const { nombre, monto } = req.body;
    if (!nombre || !monto) {
      return res.status(400).json({ error: "Nombre y monto son obligatorios" });
    }

    const pagoId = await crearPago(nombre, monto);
    await actualizarCaja(-monto); // 👈 descontamos de la caja

    res.json({ message: "Pago registrado", id: pagoId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET /api/pagos
export async function listarPagos(req, res) {
  try {
    const pagos = await obtenerPagos();
    res.json(pagos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
