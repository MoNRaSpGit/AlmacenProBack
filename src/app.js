import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import cajaRoutes from "./routes/cajaRoutes.js";
import productRoutes from "./routes/products.js";
import pagoRoutes from "./routes/pagoRoutes.js";
import stockRoutes from "./routes/stockRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas principales
app.use("/api/products", productRoutes);
app.use("/api/caja", cajaRoutes);
app.use("/api/pagos", pagoRoutes);
app.use("/api/stock", stockRoutes);

app.get("/", (_req, res) => res.send("✅ API AlmacenPro funcionando"));

export default app;
