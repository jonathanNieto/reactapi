const express = require('express');
const multer = require('multer');
const path = require('path');

const routes = require('../routes/index.routes');

/* initializations */
require('./database');
const app = express();

/* settings */
app.set('port', process.env.PORT || 3000);


/* middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const multerConfig = {
    storage: multer.diskStorage({
        destination: path.join(__dirname, '/../uploads'),
        filename: (req, file, cb) => {
            cb(null, new Date().getTime() + path.extname(file.originalname));
        }
    }),
    fileFilTer(req, file, next) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            next(null, true);
        } else {
            next(new Error('Formato de imagen no válido'));
        }
    }
};
app.use(multer(multerConfig).single('image'));

/* routing */
app.use('/', routes);

module.exports = app;