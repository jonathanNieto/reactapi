const express = require('express');

const clientRoutes = require('./client.routes')

/* Initializations */
const app = express();

/* routes */
app.use('/client', clientRoutes);
/* appRoutes.use('/', homeRoutes);
appRoutes.use('/', authRoutes); */

module.exports = app;