import express from 'express'
import cors from 'cors'
import productsRoutes from './routes/products.js'

const app = express()
app.use(cors())
app.use(express.json())

// rutas
app.use('/api/products', productsRoutes)

export default app
