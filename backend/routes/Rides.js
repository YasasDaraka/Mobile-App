var express = require('express');
var rideController = require('../controller/RideController');
const verifyFirebaseToken = require("../auth/verifyFirebaseToken");
var router = express.Router();


router.get('/get/:email',verifyFirebaseToken, rideController.getRideByUsername);
router.post('/fare',verifyFirebaseToken, rideController.fareCalculate);
router.post('/request',verifyFirebaseToken, rideController.addRide);
router.delete('/', rideController.removeRide);

module.exports = router;
