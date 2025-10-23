import express from "express";
import {
  getProduct,
  listProducts,
  crearProductoRapido,
  obtenerProductoPorCodigo,
  getRandomProducts,
} from "../controllers/productsController.js";

const router = express.Router();

// 🎲 Ruta de productos aleatorios (antes que cualquier parámetro dinámico)
router.get("/random/:cantidad", getRandomProducts);

// 🆕 Crear producto rápido
router.post("/rapido", crearProductoRapido);

// 🔍 Buscar producto por código específico
router.get("/codigo/:barcode", obtenerProductoPorCodigo);

// 📋 Listar todos los productos
router.get("/", listProducts);

// 🔹 Buscar por código genérico (al final)
router.get("/:barcode", getProduct);

export default router;
