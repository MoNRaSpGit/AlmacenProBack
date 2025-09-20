import express from "express";
import { getProduct, listProducts } from "../controllers/productsController.js";

const router = express.Router();

// Listar todos los productos
router.get("/", listProducts);

// Buscar producto por código
router.get("/:barcode", getProduct);

export default router;
