import express from 'express'
import { getProduct, listProducts } from '../controllers/productsController.js'

const router = express.Router()

router.get('/', listProducts)
router.get('/:barcode', getProduct)

export default router
