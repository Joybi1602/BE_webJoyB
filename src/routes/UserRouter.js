const express = require("express");
const router = express.Router();
const usrController = require('../controllers/UserControllers');
const { authMiddleware, authUserMiddleware } = require("../middleware/authMiddlware");

router.post('/sign-up', usrController.createUser);
router.post('/sign-in', usrController.loginUser);
router.post('/log-out', usrController.logoutUser);
router.put('/update-user/:id', authUserMiddleware, usrController.updateUser);
router.delete('/delete-user/:id',authMiddleware , usrController.deleteUser);
router.get('/getAll',authMiddleware, usrController.getAllUser);
router.get('/get-details/:id', authUserMiddleware, usrController.getDetailsUser);
router.post('/refresh-token', usrController.refreshToken);
router.post('/delete-many',authMiddleware, usrController.deleteManyUser);


module.exports = router;
