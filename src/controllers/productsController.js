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
