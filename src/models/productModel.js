import { db } from '../config/db.js'

export async function findByBarcode(barcode) {
  const [rows] = await db.query("SELECT * FROM productos_test WHERE barcode = ?", [barcode])
  return rows[0] || null
}

export async function getAllProducts() {
  const [rows] = await db.query("SELECT * FROM productos_test")
  return rows
}
