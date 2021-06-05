const User = require('../models/user');
const jwt = require('jsonwebtoken');
const env = require('dotenv');

exports.signup = (req,res) =>{

    User.findOne({email : req.body.email })
    .exec((error,user)=>{
        if(user) return res.status(400).json({
            message : 'User already exists! '
        });
    
        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;
        const _user = new User({firstName,
            lastName,
            username : Math.random().toString(),
            email,
            password
        });
    
    _user.save((error,data) =>{
        if (error){
            return res.status(400).json({
                message : error
            });   
        }

        if(data){
             return res.status(201).json({
                 user : data
             })
        }
    });
});
}

exports.signin = (req,res) => {
    User.findOne({email : req.body.email})
    .exec((error, user) =>{
        if(error) return res.status(400).json({error});
        if(user){
            if(user.authenticate(req.body.password)){
                const token = jwt.sign(
                    {_id : user._id , role : user.role},
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' }
                    );
                const { _id ,firstName, lastName, email,role,fullname} = user;
                res.status(200).json({
                    token,
                    user : {
                        _id,firstName, lastName, email,role,fullname
                    }
                });
            }else{
                return res.status(400).json({message : "Invalid password"});
            }
        }else{
            return res.status(400).json({message : "Something went wrong"});
        }
    });
}

