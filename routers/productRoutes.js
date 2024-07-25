const product = require('../controllers/productController')
const middleware = require('../middleware/usermiddle')
const router = require('express').Router()

 
router.post('/newproduct',middleware,product.createProduct)
router.get('/allproducts',middleware,product.getAllProducts)
router.get('/product/:id',middleware, product.getProductById)
router.put('/update/:id',middleware,product.updateProductById)
router.delete('/delete/:id',middleware,product.deleteProductById)


module.exports = router

