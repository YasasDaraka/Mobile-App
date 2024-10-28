var express = require('express');
var rieController = require('../controller/RideController');
const verifyFirebaseToken = require("../auth/verifyFirebaseToken");
var router = express.Router();


router.get('/get/:email',verifyFirebaseToken, rieController.getRideByUsername);
router.post('/fare',verifyFirebaseToken, rieController.fareCalculate);
router.post('/request',verifyFirebaseToken, rieController.addRide);
router.delete('/', rieController.removeRide);

module.exports = router;
