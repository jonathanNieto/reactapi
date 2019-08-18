const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    email: { type: String, required: [true, 'Email es requerido'], unique: true, lowercase: true, trim: true },
    name: { type: String, required: [true, 'Nombre es requerido'], trim: true },
    lastname: { type: String, required: [true, 'Apellidos son requeridos'], trim: true },
    company: { type: String, trim: true },
    phone: { type: String, trim: true },
});

module.exports = mongoose.model('Client', clientSchema);
