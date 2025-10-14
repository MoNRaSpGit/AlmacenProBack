import express from "express";
import { registrarPago, listarPagos } from "../controllers/pagosController.js";

const router = express.Router();

// Crear pago
router.post("/", registrarPago);

// Listar pagos
router.get("/", listarPagos);

export default router;
