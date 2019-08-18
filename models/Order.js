const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    client: { type: Schema.Types.ObjectId, ref: 'Client' },
    products: [{
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number }
    }],
    total: { type: String },
});

module.exports = mongoose.model('Order', orderSchema);
