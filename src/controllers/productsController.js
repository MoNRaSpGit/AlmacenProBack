import { findByBarcode, getAllProducts } from '../models/productModel.js'

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

    if (!price || !barcode) {
      return res.status(400).json({ error: "Precio y código son obligatorios" });
    }

    const nombreFinal = name && name.trim() !== "" ? name.trim() : "Producto?";
    const [result] = await db.execute(
      `INSERT INTO productos_test (name, price, barcode, status)
       VALUES (?, ?, ?, 'pendiente')`,
      [nombreFinal, price, barcode]
    );

    res.json({ id: result.insertId, name: nombreFinal, price, barcode });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

