const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    ratings: {
        type: String
    },
    comment: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model('Feedback', feedbackSchema);