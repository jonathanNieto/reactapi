const mongoose = require('mongoose');
const crypto = require('crypto').randomBytes(256).toString('hex');

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(db => console.log('DB is connected'))
    .catch((err) => console.error(err));

process.env.SECRET_KEY = crypto;