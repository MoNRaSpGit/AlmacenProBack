import express from "express";
import { getProduct, listProducts, crearProductoRapido,obtenerProductoPorCodigo  } from "../controllers/productsController.js";

const router = express.Router();

// Listar todos los productos
router.get("/", listProducts);

// Buscar producto por código
router.get("/:barcode", getProduct);

router.post("/rapido", crearProductoRapido);

router.get("/:barcode", obtenerProductoPorCodigo);
export default router;
