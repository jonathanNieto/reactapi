const express = require('express');

const clientRoutes = require('./client.routes');
const productRoutes = require('./product.routes');
const ordersRoutes = require('./order.routes');
const authRoutes = require('./auth.routes');

/* Initializations */
const app = express();

/* routes */
app.use('/client', clientRoutes);
app.use('/product', productRoutes);
app.use('/order', ordersRoutes);
app.use('/auth', authRoutes);

module.exports = app;