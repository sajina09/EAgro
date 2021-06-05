const express = require('express');
const { requireSignin } = require('../common-middleware');
const router = express.Router();
const {signup , signin} = require('../controllers/auth');
const { validateSigninRequest,validateSignupRequest, isRequestValidated } = require('../validators/auth');

router.post('/signin' ,validateSigninRequest, isRequestValidated, signin );
router.post('/signup' , validateSignupRequest,isRequestValidated, signup );

/* router.post('/profile',(req,res)=>{
    res.status(200).json({
        user : 'profile'
    });
}); */

module.exports = router; 

