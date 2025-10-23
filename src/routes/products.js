import express from "express";
import {
  getProduct,
  listProducts,
  crearProductoRapido,
  obtenerProductoPorCodigo,
  getRandomProducts,
} from "../controllers/productsController.js";

const router = express.Router();

// 🔹 Productos random
router.get("/random/:cantidad", getRandomProducts);

// 🔹 Listar todos
router.get("/", listProducts);

// 🔹 Buscar producto por código
router.get("/codigo/:barcode", obtenerProductoPorCodigo);

// 🔹 Crear producto rápido
router.post("/rapido", crearProductoRapido);

export default router;
