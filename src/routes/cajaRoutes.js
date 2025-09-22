import express from "express";
import { iniciar, ver, venta, pago } from "../controllers/cajaController.js";

const router = express.Router();

router.post("/iniciar", iniciar);
router.get("/", ver);
router.post("/venta", venta);
router.post("/pago", pago);

export default router;
