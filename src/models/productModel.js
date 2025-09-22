import { db } from '../config/db.js'

export async function findByBarcode(barcode) {
  const [rows] = await db.query("SELECT * FROM products WHERE barcode = ?", [barcode])
  return rows[0] || null
}

export async function getAllProducts() {
  const [rows] = await db.query("SELECT * FROM products")
  return rows
}
