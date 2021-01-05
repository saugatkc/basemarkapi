const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    image: {
        type: String
    },
    product_title: {
        type: String
    },
    product_category: {
        type: String
    },
    //Gender for filtering
    product_gender: {
        type: String
    },
    product_size: [{
        type: String
    }],
    description: {
        type: String
    },
    stock: {
        type: Number
    },
    price: {
        type: Number
    },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);