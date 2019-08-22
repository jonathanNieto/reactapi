const express = require('express');
const router = express.Router();

const orderController = require('../controllers/order.controller');
const auth = require('../middlewares/auth.middleware');


/* new order */
router.post('/', auth.is_authenticated, orderController.create_order_post);

/* get all orders */
router.get('/all', auth.is_authenticated, orderController.get_all_orders_get);

/* get one order by id */
router.get('/:id', auth.is_authenticated, orderController.get_one_order_get);

/* update one order */
router.put('/:id', auth.is_authenticated, orderController.update_order_put)

/* delete one order */
router.delete('/:id', auth.is_authenticated, orderController.delete_order_delete);

module.exports = router;
