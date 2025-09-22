import express from "express";
import { abrir, verActiva, venta, pago, cerrar } from "../controllers/cajaController.js";

const router = express.Router();

router.post("/abrir", abrir);
router.get("/activa", verActiva);
router.post("/venta", venta);
router.post("/pago", pago);
router.post("/cerrar", cerrar);

export default router;
