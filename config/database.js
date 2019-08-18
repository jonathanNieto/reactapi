const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/reactapi', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(db => console.log('DB is connected'))
    .catch((err) => console.error(err));

/* import models */