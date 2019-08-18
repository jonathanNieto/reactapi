const express = require('express');
const router = express.Router();

const orderController = require('../controllers/order.controller');


/* new order */
router.post('/', orderController.create_order_post);

/* get all orders */
router.get('/all', orderController.get_all_orders_get);

/* get one order by id */
router.get('/:id', orderController.get_one_order_get);

/* update one order */
router.put('/:id', orderController.update_order_put)

/* delete one order */
router.delete('/:id', orderController.delete_order_delete);

module.exports = router;
