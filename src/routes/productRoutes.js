const express = require('express');
const router = express.Router();
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

router.post('/products', createProduct);          // RF01
router.get('/products', getProducts);             // RF02, RF03, RF04
router.put('/products/:id', updateProduct);       // RF05
router.delete('/products/:id', deleteProduct);    // RF06

module.exports = router;