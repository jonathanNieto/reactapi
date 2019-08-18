const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller');


/* new product */
router.post('/', productController.create_product_post);

/* get all products */
router.get('/all', productController.get_all_products_get);

/* get one product by id */
router.get('/:id', productController.get_one_product_get);

/* update one product */
router.put('/:id', productController.update_product_put)

/* delete one product */
router.delete('/:id', productController.delete_product_delete);

module.exports = router;
