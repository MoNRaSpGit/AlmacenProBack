import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cajaRoutes from "./routes/cajaRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/products", productRoutes);
app.use("/api/caja", cajaRoutes);

export default app;
