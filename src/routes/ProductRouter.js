const express = require("express");
const router = express.Router();
const ProductController = require('../controllers/ProductControllers');
const { authMiddleware } = require("../middleware/authMiddlware");

router.post('/create', ProductController.createProduct);
router.put('/update/:id',authMiddleware , ProductController.updateProduct);
router.get('/get-details/:id', ProductController.getDetailsProduct);
router.delete('/delete/:id',authMiddleware, ProductController.deleteProduct);
router.get('/getAll',  ProductController.getAllProduct);
router.post('/delete-many',authMiddleware, ProductController.deleteManyProduct);
router.get('/getAll-type', ProductController.getAllTypeProduct);








module.exports = router;
