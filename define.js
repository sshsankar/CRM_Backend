// src/routes/index.js
const express = require('express');
const router = express.Router();
const customerController = require('./controllers/customer.js');
const orderController = require('./controllers/order.js');
const campaignController = require('./controllers/campaign.js');


router.post('/customers', customerController.addCustomer);
router.get('/customers', customerController.getCustomers);
router.post('/orders', orderController.addOrder);
router.post('/campaign', campaignController.createCampaign);
router.get('/campaign/logs', campaignController.getCampaignLogs);
router.get('/orders',orderController.getOrders);
router.post('/orders',orderController.addOrder);

module.exports = router;

