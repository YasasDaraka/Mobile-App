var express = require('express');
var userController = require('../controller/UserController');
var router = express.Router();


router.get('/get/:email', userController.getUserById);
router.post('/auth', userController.addUser );
router.post('/', userController.addUser);
router.put('/', userController.updateUser);
router.delete('/', userController.removeUser);

module.exports = router;
