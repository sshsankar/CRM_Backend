
// src/controllers/orderController.js
const Order = require('../models/order.js');
const mongoose = require('mongoose');

exports.addOrder = async (req, res) => {
    try {
        console.log(req.body);

        // Convert orderAmount to a number
        const orderAmount = Number(req.body.orderAmount);
        const visits=Number(req.body.visits);

        // Find orders of the specific customer
        const orderDetailsOfSpecificUser = await Order.find({ customerId: req.body.customerId });

        console.log("**********");
        console.log(orderDetailsOfSpecificUser.length);

        // Check if the customer already has an order
        if (orderDetailsOfSpecificUser.length > 0) {
            // Customer exists, update the existing order
            const currOrderDetails = orderDetailsOfSpecificUser[0];
            // Add the new order amount to the existing order amount
            currOrderDetails.orderAmount += orderAmount;
            currOrderDetails.visits+=visits;

            // Update the existing order in the database
            await Order.updateOne(
                { _id: currOrderDetails._id }, 
                { $set: { orderAmount: currOrderDetails.orderAmount } }
            );

            return res.json("Order details updated");
        }

        // New customer, create a new order
        const newOrder = new Order({
            ...req.body,
            orderAmount: orderAmount // Ensure orderAmount is a number
        });

        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};


exports.getOrders = async (req, res) => {
    try {
        console.log("Get orders called ...");

        // Fetch all orders from the database
        const orders = await Order.find();
        console.log(orders);

        // Return the orders as JSON response
        return res.json(orders);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
