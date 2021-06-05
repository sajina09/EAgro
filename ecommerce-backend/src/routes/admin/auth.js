const express = require('express');
const { validationResult } = require('express-validator');
const { requireSignin } = require('../../common-middleware');
const router = express.Router();
const {signup , signin, signout} = require('../../controllers/admin/auth');
const { validateSigninRequest,validateSignupRequest, isRequestValidated } = require('../../validators/auth');


router.post('/admin/signin',validateSigninRequest,isRequestValidated ,signin );
router.post('/admin/signup', validateSignupRequest,isRequestValidated, signup );
router.post('/admin/signout', requireSignin , signout);



module.exports = router; 

