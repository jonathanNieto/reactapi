const express = require('express');

const routes = require('../routes/index.routes');

/* initializations */
require('./database');
const app = express();

/* settings */
app.set('port', process.env.PORT || 3000);


/* middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/* routing */
app.use('/', routes);

module.exports = app;