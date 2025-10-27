// src/routes/pedidosRoutes.js
import express from "express";
import {
  listWebPedidos,
  crearWebPedidoController,
  obtenerWebPedido,
  cambiarEstadoWebPedido,
} from "../controllers/webPedidosController.js";

const router = express.Router();

// GET /api/pedidos               -> lista todos (con items)
router.get("/", listWebPedidos);

// POST /api/pedidos              -> crea pedido con items
router.post("/", crearWebPedidoController);

// GET /api/pedidos/:id           -> detalle de un pedido
router.get("/:id", obtenerWebPedido);

// PATCH /api/pedidos/:id/estado  -> cambiar estado
router.patch("/:id/estado", cambiarEstadoWebPedido);

export default router;
