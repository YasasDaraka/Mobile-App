var express = require('express');
var driverController = require('../controller/DriverController');
var router = express.Router();
var verifyFirebaseToken = require('../auth/verifyFirebaseToken');

router.get('/get/:email',verifyFirebaseToken, driverController.getDriverById);
router.post('/signin', driverController.signIn);
router.post('/signup', driverController.signUp);
router.put('/',verifyFirebaseToken, driverController.updateDriver);
router.delete('/',verifyFirebaseToken, driverController.removeDriver);

module.exports = router;
