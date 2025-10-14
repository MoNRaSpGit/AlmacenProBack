// src/app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cajaRoutes from "./routes/cajaRoutes.js";
import productRoutes from "./routes/products.js"; // <- O el nombre que tengas realmente
//import pagoRoutes from "./routes/pagoRoutes.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/products", productRoutes);
app.use("/api/caja", cajaRoutes);

//app.use("/api/pagos", pagoRoutes);

app.get("/", (_req, res) => res.send("✅ API AlmacenPro funcionando"));
export default app;
