const express = require('express');

const clientRoutes = require('./client.routes');
const productRoutes = require('./product.routes');

/* Initializations */
const app = express();

/* routes */
app.use('/client', clientRoutes);
app.use('/product', productRoutes);
/* appRoutes.use('/', homeRoutes);
appRoutes.use('/', authRoutes); */

module.exports = app;