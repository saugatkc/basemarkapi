const { mongo, Mongoose } = require("mongoose");

const mongoose = require('mongoose');

const productCategorySchema = new mongoose.Schema({
    category: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('ProductCategory', productCategorySchema);