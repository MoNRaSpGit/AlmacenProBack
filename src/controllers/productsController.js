import { findByBarcode, getAllProducts } from "../models/productModel.js";
import { db } from "../config/db.js";

// 🧾 Buscar producto por código
export async function getProduct(req, res) {
  try {
    const product = await findByBarcode(req.params.barcode);
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(product);
  } catch (err) {
    console.error("❌ Error en getProduct:", err);
    res.status(500).json({ message: err.message });
  }
}

// 📋 Listar todos los productos
export async function listProducts(_req, res) {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (err) {
    console.error("❌ Error en listProducts:", err);
    res.status(500).json({ message: err.message });
  }
}

// ⚡ Crear producto rápido (desde el POS)
export async function crearProductoRapido(req, res) {
  try {
    const { name, price, barcode } = req.body;
    if (!price || !barcode) {
      return res.status(400).json({ error: "Precio y código son obligatorios" });
    }

    const nombreFinal = name?.trim() || "Producto?";
    const precioFinal = parseFloat(price) || 0;

    const [result] = await db.execute(
      `INSERT INTO productos_test (name, price, barcode, status)
       VALUES (?, ?, ?, 'pendiente')`,
      [nombreFinal, precioFinal, barcode]
    );

    res.json({
      id: result.insertId,
      name: nombreFinal,
      price: precioFinal,
      barcode,
    });
  } catch (err) {
    console.error("❌ Error en crearProductoRapido:", err);
    res.status(500).json({ error: err.message });
  }
}

// 🔍 Buscar producto por código exacto
export async function obtenerProductoPorCodigo(req, res) {
  try {
    const { barcode } = req.params;
    const [rows] = await db.execute(
      "SELECT * FROM productos_test WHERE barcode = ?",
      [barcode]
    );
    if (rows.length === 0)
      return res.status(404).json({ error: "Producto no encontrado" });
    res.json(rows[0]);
  } catch (err) {
    console.error("❌ Error en obtenerProductoPorCodigo:", err);
    res.status(500).json({ error: err.message });
  }
}

// 🎲 Obtener productos aleatorios
// 🎲 Obtener productos aleatorios
export async function getRandomProducts(req, res) {
  try {
    const cantidad = parseInt(req.params.cantidad) || 5;

    // Seguridad: aseguramos que 'cantidad' sea un número entero positivo y máximo 50
    const limit = Math.max(1, Math.min(cantidad, 50));

    const [rows] = await db.query(`
      SELECT id, name, price, barcode
      FROM productos_test
      WHERE price IS NOT NULL AND price > 0
      ORDER BY RAND()
      LIMIT ${limit};
    `);

    res.json(rows);
  } catch (err) {
    console.error("❌ Error al obtener productos random:", err);
    res.status(500).json({ error: "Error al obtener productos random" });
  }
}

