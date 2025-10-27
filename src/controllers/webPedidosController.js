// src/controllers/webPedidosController.js
import {
  getAllWebPedidos,
  getDetalleForPedidoIds,
  createWebPedido,
  getWebPedidoById,
  updateWebPedidoEstado,
} from "../models/webPedidosModel.js";

export async function listWebPedidos(req, res) {
  try {
    const pedidos = await getAllWebPedidos();
    const ids = pedidos.map(p => p.id);
    const detalles = await getDetalleForPedidoIds(ids);

    // agrupar detalles por pedido_id
    const map = new Map();
    for (const d of detalles) {
      if (!map.has(d.pedido_id)) map.set(d.pedido_id, []);
      map.get(d.pedido_id).push({
        id: d.id,
        producto_id: d.producto_id,
        name: d.producto_nombre || `#${d.producto_id}`,
        cantidad: d.cantidad,
        price: d.precio_unitario,
      });
    }

    const respuesta = pedidos.map(p => ({
      id: p.id,
      cliente: p.cliente_nombre,
      contacto: p.cliente_contacto,
      total: Number(p.total || 0),
      estado: p.estado,
      creado_at: p.fecha,           // el front lo maneja como fecha
      observaciones: p.observaciones,
      items: map.get(p.id) || [],
    }));

    res.json(respuesta);
  } catch (err) {
    console.error("❌ Error listando webpedidos:", err);
    res.status(500).json({ error: "Error listando pedidos" });
  }
}

export async function crearWebPedidoController(req, res) {
  try {
    const { cliente_nombre = null, cliente_contacto = null, observaciones = null, estado = "pendiente", items = [] } = req.body || {};
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Debe enviar al menos un item" });
    }

    // Validación simple de items
    for (const it of items) {
      if (!it.producto_id) return res.status(400).json({ error: "Falta producto_id en un item" });
    }

    const pedidoId = await createWebPedido({ cliente_nombre, cliente_contacto, observaciones, estado, items });
    const detalle = await getWebPedidoById(pedidoId);
    res.status(201).json(detalle);
  } catch (err) {
    console.error("❌ Error creando webpedido:", err);
    res.status(500).json({ error: "Error creando pedido" });
  }
}

export async function obtenerWebPedido(req, res) {
  try {
    const detalle = await getWebPedidoById(req.params.id);
    if (!detalle) return res.status(404).json({ error: "Pedido no encontrado" });
    res.json(detalle);
  } catch (err) {
    console.error("❌ Error obteniendo webpedido:", err);
    res.status(500).json({ error: "Error obteniendo pedido" });
  }
}

export async function cambiarEstadoWebPedido(req, res) {
  try {
    const { estado } = req.body || {};
    const validos = ["pendiente", "en_proceso", "listo"];
    if (!estado || !validos.includes(estado)) {
      return res.status(400).json({ error: "Estado inválido" });
    }
    await updateWebPedidoEstado(req.params.id, estado);
    const detalle = await getWebPedidoById(req.params.id);
    res.json(detalle);
  } catch (err) {
    console.error("❌ Error cambiando estado del webpedido:", err);
    res.status(500).json({ error: "Error cambiando estado" });
  }
}
