'use strict';

let express = require('express');
let controller = require('./emailer');

let router = express.Router();

//TODO remove these routes.. unit test only 
router.get('/', controller.index);
router.post('/register',controller.register)
router.post('/forgot-pw',controller.forgotPassword)


module.exports = router;
