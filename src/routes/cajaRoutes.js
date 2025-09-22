import express from "express";
import {
  abrir,
  venta,
  pago,
  saldo,
  cerrar,
} from "../controllers/cajaController.js";

const router = express.Router();

router.post("/abrir", abrir);
router.post("/venta", venta);
router.post("/pago", pago);
router.get("/saldo/:sesionId", saldo);
router.post("/cerrar", cerrar);

export default router;
