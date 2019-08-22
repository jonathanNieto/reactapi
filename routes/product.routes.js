const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller');
const auth = require('../middlewares/auth.middleware');


/* new product */
router.post('/', auth.is_authenticated, productController.create_product_post);

/* get all products */
router.get('/all', auth.is_authenticated, productController.get_all_products_get);

/* get one product by id */
router.get('/:id', auth.is_authenticated, productController.get_one_product_get);

/* update one product */
router.put('/:id', auth.is_authenticated, productController.update_product_put)

/* delete one product */
router.delete('/:id', auth.is_authenticated, productController.delete_product_delete);

/* search product */
router.post('/search/:query', auth.is_authenticated, productController.search_product_post);

module.exports = router;
