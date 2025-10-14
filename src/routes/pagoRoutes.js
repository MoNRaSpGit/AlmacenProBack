import express from "express";
import { registrarPago, listarPagos } from "../controllers/pagosController.js";
const router = express.Router();

router.post("/", registrarPago);
router.get("/", listarPagos);

export default router;
