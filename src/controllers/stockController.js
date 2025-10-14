import { db } from "../config/db.js";

export async function obtenerControlStock(req, res) {
  try {
    const [rows] = await db.execute(`
      SELECT 
        p.name AS producto,
        SUM(vd.cantidad) AS cantidad_vendida,
        MAX(m.fecha) AS ultima_venta
      FROM ventas_detalle vd
      JOIN productos p ON vd.producto_id = p.id
      JOIN movimientos m ON vd.movimiento_id = m.id
      GROUP BY p.id
      ORDER BY cantidad_vendida DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
