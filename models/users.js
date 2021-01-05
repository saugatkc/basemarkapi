const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 6
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        default: 'customer',
        enum: ['customer', 'admin']
    },
     resetpasswordToken:{
         type: String,
         
     }, 
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);