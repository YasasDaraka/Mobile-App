var express = require('express');
var driverController = require('../controller/DriverController');
var router = express.Router();


router.get('/get/:email', driverController.getDriverById);
router.post('/auth', driverController.addDriver);
router.post('/', driverController.addDriver);
router.put('/', driverController.updateDriver);
router.delete('/', driverController.removeDriver);

module.exports = router;
