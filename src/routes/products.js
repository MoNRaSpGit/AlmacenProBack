import express from "express";
import {
  getProduct,
  listProducts,
  crearProductoRapido,
  obtenerProductoPorCodigo,
  
} from "../controllers/productsController.js";

const router = express.Router();




// 🆕 Crear producto rápido
router.post("/rapido", crearProductoRapido);

// 🔍 Buscar producto por código específico
router.get("/codigo/:barcode", obtenerProductoPorCodigo);

// 📋 Listar todos los productos
router.get("/", listProducts);

// 🔹 Buscar por código genérico (al final)
router.get("/:barcode", getProduct);

export default router;
