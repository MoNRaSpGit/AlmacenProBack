import app from './app.js'
import { db } from './config/db.js'

const PORT = process.env.PORT || 4000

// Probar conexión a la DB
try {
  const [rows] = await db.query("SELECT NOW() as now")
  console.log("✅ Conectado a la base de datos en:", rows[0].now)
} catch (err) {
  console.error("❌ Error al conectar con la DB:", err.message)
}

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
})
