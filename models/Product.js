const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String, required: [true, 'Nombre es requerido'], trim: true },
    price: { type: Number, required: [true, 'Precio es requerido'] },
    image: String
});

module.exports = mongoose.model('Product', productSchema);
