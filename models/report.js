const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    reportImage: {
        type: String
    },
    title: {
        type: String
    },
    detail: {
        type: String
    },
    reportType: {
        type: String
    },
}, { timestamps: true })

module.exports = mongoose.model('Report', reportSchema);
