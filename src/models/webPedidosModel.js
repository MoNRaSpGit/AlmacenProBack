// src/models/webPedidosModel.js
import { db } from "../config/db.js";

/** Lista cabeceras de pedidos (webpedidos) */
export async function getAllWebPedidos() {
  const [rows] = await db.execute(
    `SELECT id, fecha, cliente_nombre, cliente_contacto, estado, total, observaciones
     FROM webpedidos
     ORDER BY fecha DESC`
  );
  return rows;
}

/** Trae los detalles de varios pedidos, con el nombre del producto */
export async function getDetalleForPedidoIds(pedidoIds = []) {
  if (pedidoIds.length === 0) return [];
  const placeholders = pedidoIds.map(() => "?").join(",");
  const [rows] = await db.execute(
    `SELECT d.id, d.pedido_id, d.producto_id, d.cantidad, d.precio_unitario,
            p.name AS producto_nombre
     FROM webpedidos_detalle d
     LEFT JOIN productos_test p ON p.id = d.producto_id
     WHERE d.pedido_id IN (${placeholders})
     ORDER BY d.id ASC`,
    pedidoIds
  );
  return rows;
}

/** Crea pedido + items (transacción) */
export async function createWebPedido({ cliente_nombre = null, cliente_contacto = null, observaciones = null, estado = "pendiente", items = [] }) {
  // Calcula total del pedido a partir de los items recibidos
  const total = items.reduce((acc, it) => {
    const cant = Number(it.cantidad || 0);
    const pu   = Number(it.precio_unitario || 0);
    return acc + cant * pu;
  }, 0);

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const [resCab] = await conn.execute(
      `INSERT INTO webpedidos (cliente_nombre, cliente_contacto, estado, total, observaciones)
       VALUES (?, ?, ?, ?, ?)`,
      [cliente_nombre, cliente_contacto, estado, total, observaciones]
    );
    const pedidoId = resCab.insertId;

    if (items.length > 0) {
      const values = items.map(it => [
        pedidoId,
        Number(it.producto_id),
        Number(it.cantidad || 1),
        Number(it.precio_unitario || 0),
      ]);

      // Inserción múltiple
      await conn.query(
        `INSERT INTO webpedidos_detalle (pedido_id, producto_id, cantidad, precio_unitario)
         VALUES ?`,
        [values]
      );
    }

    await conn.commit();
    return pedidoId;
  } catch (e) {
    await conn.rollback();
    throw e;
  } finally {
    conn.release();
  }
}

/** Detalle completo de un pedido */
export async function getWebPedidoById(id) {
  const [[cab]] = await db.execute(
    `SELECT id, fecha, cliente_nombre, cliente_contacto, estado, total, observaciones
     FROM webpedidos WHERE id = ?`,
    [id]
  );
  if (!cab) return null;

  const [items] = await db.execute(
    `SELECT d.id, d.producto_id, d.cantidad, d.precio_unitario, p.name AS producto_nombre
     FROM webpedidos_detalle d
     LEFT JOIN productos_test p ON p.id = d.producto_id
     WHERE d.pedido_id = ?
     ORDER BY d.id ASC`,
    [id]
  );

  return { ...cab, items };
}

/** Cambiar estado */
export async function updateWebPedidoEstado(id, nuevoEstado) {
  await db.execute(`UPDATE webpedidos SET estado = ? WHERE id = ?`, [nuevoEstado, id]);
}
