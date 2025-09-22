import express from "express";
import {
  iniciar,
  ver,
  venta,
  pago,
  listarPagos,
} from "../controllers/cajaController.js";

const router = express.Router();

router.post("/iniciar", iniciar); // iniciar caja hoy
router.get("/", ver);             // ver caja hoy
router.post("/venta", venta);     // sumar venta
router.post("/pago", pago);       // restar pago + registrar en tabla pagos
router.get("/pagos", listarPagos);// listar pagos de HOY

export default router;
