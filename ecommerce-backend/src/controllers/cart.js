const Cart = require('../models/cart');

exports.addtoCart = (req,res) => {

    Cart.findOne({user:req.user._id})
    .exec((error,cart)=>{
        if(error) return res.status(400).json({ error });
        if(cart){
            console.log("if cart");

            const product = req.body.cartItems.product
            const item = cart.cartItems.find(c => c.product == product );
            let condition , update ;
            if(item){
                console.log("if item");
                condition = { "user" : req.user._id, "cartItems.product": product} ;
                update = { "$set" : {
                        "cartItems.$" : {
                             ...req.body.cartItems,
                            quantity : parseInt(item.quantity) + parseInt(req.body.cartItems.quantity) 
                        } 
                    }
               };
            }
            else{
                console.log("else item");

                condition = { user : req.user._id};
                update = {
                    "$push" :{
                        "cartItems" : req.body.cartItems
                        }
                };
            }
            Cart.findOneAndUpdate(condition,update)
            .exec((error,_cart)=>{
                if(error) return res.status(400).json({ error });
                if(_cart){
                    console.log("if else item cart");
                    return res.status(201).json({ cart:_cart });
                }
            })
        }
        else{
            console.log("elseeeee cart");

            const cart  = new Cart ({
                user : req.user._id,
                cartItems : [req.body.cartItems]
            });
            cart.save((error,cart)=>{
                if(error) return res.status(400).json({ error });
                if(cart){
                    console.log("if item cart");

                    return res.status(201).json({ cart });
                }
            });
        }
    });
}