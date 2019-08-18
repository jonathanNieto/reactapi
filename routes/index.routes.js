const express = require('express');

const clientRoutes = require('./client.routes');
const productRoutes = require('./product.routes');
const ordersRoutes = require('./order.routes');

/* Initializations */
const app = express();

/* routes */
app.use('/client', clientRoutes);
app.use('/product', productRoutes);
app.use('/order', ordersRoutes);

module.exports = app;