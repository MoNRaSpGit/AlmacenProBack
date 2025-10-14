import express from "express";
import { obtenerControlStock } from "../controllers/stockController.js";

const router = express.Router();
router.get("/", obtenerControlStock);
export default router;
