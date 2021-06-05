const express = require('express');
const { requireSignin, adminMiddleware } = require('../common-middleware');
const { addtoCart } = require('../controllers/cart');
const router = express.Router();

router.post('/user/cart/addtocart' , requireSignin, adminMiddleware ,addtoCart);

module.exports = router;