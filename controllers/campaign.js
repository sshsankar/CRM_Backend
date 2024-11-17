// src/controllers/campaignController.js
const CommunicationLog = require('../models/communicationLog.js');
const Customer = require('../models/customer.js');

// Mock Vendor API
const sendCampaign = async (message, customerId) => {
    // Simulating sending message and getting a delivery status
    return new Promise((resolve) => {
        setTimeout(() => {
            const status = Math.random() < 0.9 ? 'SENT' : 'FAILED';
            resolve({ status, customerId });
        }, 1000);
    });
};

exports.createCampaign = async (req, res) => {
    console.log(req.body)
    let { criteria, message } = req.body;

    try {
        let query = {};
        msg=message
        const customers = await Customer.find();

        const logEntries = await Promise.all(customers.map(async (customer) => {
            const response = await sendCampaign("Hi "+customer.name +", you can avail 10% coupon", customer._id);
            message="Hi "+customer.name +" "+msg;
            
            return new CommunicationLog({
                customerId: response.customerId,
                message,
                status: response.status,
            }).save();
        }));

        res.status(201).json(logEntries);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getCampaignLogs = async (req, res) => {
    try {
        const logs = await CommunicationLog.find().sort({ _id: -1 });
        res.status(200).json(logs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
