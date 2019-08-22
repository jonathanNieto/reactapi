const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
require('dotenv').config({ path: 'variables.env' });

const routes = require('../routes/index.routes');

/* initializations */
require('./database');
const app = express();

/* settings */
app.set('port', process.env.PORT || 5000);


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

/* definir un dominio(s) para recibir las peticiones */
const whiteList = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: (origin, callback) => {
        const existe = whiteList.some(dominio => (dominio === origin));
        if (existe) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    }
}

app.use(cors(corsOptions));

/* static files */
app.use(express.static('uploads'));

/* routing */
app.use('/', routes);

module.exports = app;