import { db } from "../config/db.js";

// Buscar producto por código de barras
export async function findByBarcode(barcode) {
  const [rows] = await db.query(
    "SELECT * FROM productos_test WHERE barcode = ?",
    [barcode]
  );
  return rows[0] || null;
}

// Listar todos los productos
export async function getAllProducts() {
  const [rows] = await db.query("SELECT * FROM productos_test");
  return rows;
}
