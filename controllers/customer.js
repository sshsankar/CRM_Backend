// src/controllers/customerController.js
const Customer = require('../models/customer.js');

exports.addCustomer = async (req, res) => {
    try {
        console.log("add customer")
        console.log(req.body)
        const customer = new Customer(req.body);
        await customer.save();
        res.status(201).json(customer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getCustomers = async (req, res) => {
    try {
        console.log("hello customers before");
        const customers = await Customer.find();
        console.log(customers)
        console.log("hello customers");
        res.json(customers);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
