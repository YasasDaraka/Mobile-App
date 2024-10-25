var express = require('express');
var userController = require('../controller/UserController');
var router = express.Router();
var verifyFirebaseToken = require('../auth/verifyFirebaseToken');

router.get('/get/:email', userController.getUserById);
router.post('/signin', userController.signIn );
router.post('/signup', userController.signUp);
router.put('/',verifyFirebaseToken, userController.updateUser);
router.delete('/',userController.removeUser);

module.exports = router;
