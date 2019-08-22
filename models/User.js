const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: [true, 'Email es requerido'], unique: true, lowercase: true, trim: true },
    name: { type: String, required: [true, 'Nombre es requerido'], trim: true },
    lastname: { type: String, required: [true, 'Apellidos son requeridos'], trim: true },
    password: { type: String, required: [true, 'Contraseña es requerido'],trim: true },
});

module.exports = mongoose.model('User', userSchema);
