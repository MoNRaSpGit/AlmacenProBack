import express from "express";
import {
  abrir,
  verActiva,
  venta,
  pago,
  listarPagos,
  cerrar,
} from "../controllers/cajaController.js";

const router = express.Router();

router.post("/abrir", abrir);
router.get("/activa", verActiva);
router.post("/venta", venta);
router.post("/pago", pago);
router.get("/pagos", listarPagos);   // 👈 ahora sí devuelve solo HOY
router.post("/cerrar", cerrar);

export default router;
