import express from "express";
import {
  getProduct,
  listProducts,
  crearProductoRapido,
  obtenerProductoPorCodigo,
  getRandomProducts,
} from "../controllers/productsController.js";

const router = express.Router();

// 🎲 Productos aleatorios (tiene que ir antes de /:barcode)
router.get("/random/:cantidad", getRandomProducts);

// 🔹 Crear producto rápido
router.post("/rapido", crearProductoRapido);

// 🔹 Buscar producto por código (ruta más específica)
router.get("/codigo/:barcode", obtenerProductoPorCodigo);

// 🔹 Listar todos los productos
router.get("/", listProducts);

// (opcional) Si usabas getProduct con otro propósito, podés borrarlo o dejarlo al final:
// router.get("/:barcode", getProduct);

export default router;
