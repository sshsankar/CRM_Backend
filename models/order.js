// src/models/order.js
const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//     customerId: mongoose.Schema.Types.ObjectId,
//     orderAmount: Number,
//     orderDate: Date,
// });

const orderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Customer'
    },
    orderAmount: {
        type: Number, // Ensure it's a number, not a string
        required: true
    },
    visits: {
        type: Number, 
        required: true
    },
    orderDate: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('orders', orderSchema);
