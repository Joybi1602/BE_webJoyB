const express = require("express");
const router = express.Router();
const OrderController = require('../controllers/OrderController');
const { authUserMiddleware, authMiddleware } = require("../middleware/authMiddlware");


router.post('/create',authUserMiddleware , OrderController.createOrder);
router.get('/get-all-order/:id',  OrderController.getAllOrderDetails);
router.get('/get-details-order/:id', authUserMiddleware,OrderController.getDetailsOrder);
router.delete('/cancel-order/:id', authUserMiddleware,OrderController.cancelDetailsOrder);
router.get('/getAll-order',authMiddleware, OrderController.getAllOrder);








module.exports = router;
