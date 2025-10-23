import express from "express";
import {
  getProduct,
  listProducts,
  crearProductoRapido,
  obtenerProductoPorCodigo,
  getRandomProducts,
} from "../controllers/productsController.js";

const router = express.Router();

// 🎲 Nuevo endpoint para productos random
router.get("/random/:cantidad", getRandomProducts);

// ✅ Resto de rutas sigue igual
router.get("/", listProducts);
router.get("/:barcode", getProduct);
router.post("/rapido", crearProductoRapido);
router.get("/:barcode", obtenerProductoPorCodigo);

export default router;
