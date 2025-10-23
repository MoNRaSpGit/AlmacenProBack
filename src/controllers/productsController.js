import { findByBarcode, getAllProducts } from '../models/productModel.js'
import { db } from "../config/db.js";


export async function getProduct(req, res) {
  try {
    const product = await findByBarcode(req.params.barcode)
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" })
    }
    res.json(product)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export async function listProducts(req, res) {
  try {
    const products = await getAllProducts()
    res.json(products)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}


// POST /api/products/rapido
export async function crearProductoRapido(req, res) {
  try {
    const { name, price, barcode } = req.body;

    console.log("📥 Recibido en crearProductoRapido:", { name, price, barcode });

    if (!price || !barcode) {
      return res.status(400).json({ error: "Precio y código son obligatorios" });
    }

    const nombreFinal = name && name.trim() !== "" ? name.trim() : "Producto?";
    const precioFinal = parseFloat(price) || 0;

    const [result] = await db.execute(
      `INSERT INTO productos_test (name, price, barcode, status)
       VALUES (?, ?, ?, 'pendiente')`,
      [nombreFinal, precioFinal, barcode]
    );

    res.json({ id: result.insertId, name: nombreFinal, price: precioFinal, barcode });
  } catch (err) {
    console.error("❌ Error en crearProductoRapido:", err);
    res.status(500).json({ error: err.message });
  }
}


/**
 * Busca producto por código de barras
 */
export async function obtenerProductoPorCodigo(req, res) {
  try {
    const { barcode } = req.params;

    const [rows] = await db.execute(
      "SELECT * FROM productos_test WHERE barcode = ?",
      [barcode]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("❌ Error en obtenerProductoPorCodigo:", err);
    res.status(500).json({ error: err.message });
  }
}

// 🎲 Obtener productos aleatorios
export async function getRandomProducts(req, res) {
  try {
    const cantidad = parseInt(req.params.cantidad) || 5;
    const [rows] = await db.execute(
      `SELECT id, name, price, barcode FROM productos_test
       WHERE price IS NOT NULL AND price > 0
       ORDER BY RAND() LIMIT ?`,
      [cantidad]
    );
    res.json(rows);
  } catch (err) {
    console.error("❌ Error al obtener productos random:", err);
    res.status(500).json({ error: "Error al obtener productos random" });
  }
}



