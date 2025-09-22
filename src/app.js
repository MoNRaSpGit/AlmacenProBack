// src/app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Importamos las rutas (OJO: sin "src/")
import productRoutes from "./routes/productRoutes.js";
import cajaRoutes from "./routes/cajaRoutes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/products", productRoutes);
app.use("/api/caja", cajaRoutes);

// Ruta de prueba (opcional)
app.get("/", (req, res) => {
  res.send("✅ API AlmacenPro funcionando");
});

export default app;
