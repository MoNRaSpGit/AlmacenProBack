import { db } from "../config/db.js";

export async function obtenerControlStock(req, res) {
  try {
    const [rows] = await db.execute(`
      SELECT 
        p.name AS producto,
        IFNULL(SUM(vd.cantidad), 0) AS cantidad_vendida,
        MAX(m.fecha) AS ultima_venta
      FROM ventas_detalle vd
      JOIN productos_test p ON vd.producto_id = p.id
      JOIN movimientos m ON vd.movimiento_id = m.id
      GROUP BY p.id, p.name
      ORDER BY cantidad_vendida DESC
    `);

    res.json(rows);
  } catch (err) {
    console.error("❌ Error al obtener control stock:", err);
    res.status(500).json({ error: err.message });
  }
}
