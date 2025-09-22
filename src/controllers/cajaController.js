import {
  abrirCaja,
  obtenerCajaActiva,
  actualizarCaja,
  cerrarCaja,   // ✅ del modelo
} from "../models/cajaModel.js";

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
    const { monto } = req.body;
    const id = await actualizarCaja(-Number(monto));
    if (!id) return res.status(400).json({ error: "No hay caja activa" });

    const caja = await obtenerCajaActiva();
    res.json({ message: "Pago registrado", caja });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// POST /api/caja/cerrar
export async function cerrar(req, res) {
  try {
    const affected = await cerrarCaja(); // ✅ usa la del modelo
    if (!affected) {
      return res.status(400).json({ error: "No hay caja activa" });
    }
    res.json({ message: "Caja cerrada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
