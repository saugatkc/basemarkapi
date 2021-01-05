const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    qty: {
        type: String
    },
    totalPrice: {
        type: Number
    },
    destination: {
        type: String
    },
    order_date: {
        type: String
    },
    deliver_date: {
        type: String
    },
    status: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema);