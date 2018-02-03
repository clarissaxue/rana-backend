const express = require('express');
const user = require('./user.js');

const router = express.Router();

//Routes all the http requests
router.route('/createAccount').put(user.createAccount);
router.route('/getUserData').get(user.getUserData);
router.route('/checkExistingAccount').get(user.checkExistingAccount);
// router.route('/verifyPhoneNumber').get(user.verifyPhoneNumber);

//Export router to use in the index for router middleware
module.exports = router;