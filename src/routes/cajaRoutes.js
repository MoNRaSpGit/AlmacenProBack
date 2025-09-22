import express from "express";
import {
  abrir,
  verActiva,
  venta,
  pago,
  cerrar,
  listarMovimientos
} from "../controllers/cajaController.js";

const router = express.Router();

router.post("/abrir", abrir);
router.get("/activa", verActiva);
router.post("/venta", venta);
router.post("/pago", pago);
router.post("/cerrar", cerrar);
router.get("/movimientos", listarMovimientos);

export default router;
