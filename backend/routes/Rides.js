var express = require('express');
var rieController = require('../controller/RideController');
var router = express.Router();


router.get('/get/:email', rieController.getRideByUsername);
router.post('/request', rieController.addRide);
router.delete('/', rieController.removeRide);

module.exports = router;
