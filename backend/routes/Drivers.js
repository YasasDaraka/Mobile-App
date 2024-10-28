var express = require('express');
var driverController = require('../controller/DriverController');
var router = express.Router();
var verifyFirebaseToken = require('../auth/verifyFirebaseToken');

router.get('/get/:email', driverController.getDriverById);
router.post('/signin', driverController.signIn);
router.post('/signup', driverController.signUp);
router.put('/', driverController.updateDriver);
router.delete('/', driverController.removeDriver);

module.exports = router;
