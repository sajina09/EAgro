const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const env = require('dotenv');

exports.signup = (req,res) =>{
    User.findOne({email : req.body.email })
    .exec((error,user)=>{
        if(user) return res.status(400).json({
            message : 'Admin already exists! '
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
            password,
            role : 'admin'
        });
    
    _user.save((error,data) =>{
        if (error){
            return res.status(400).json({
                message : error
            });   
        }

        if(data){
             return res.status(201).json({
                 mes : 'Admin account created! ' 
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
            if(user.authenticate(req.body.password) && user.role==='admin'){
                const token = jwt.sign(
                    {_id : user._id , role : user.role},
                    process.env.JWT_SECRET,
                    { expiresIn: '1d' }
                    );
                const { _id ,firstName, lastName, email,role,fullname} = user;
                res.cookie('token', token ,{expiresIn: '1d'});
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

exports.signout = (req,res) => {

    res.clearCookie('token');
    res.status(200).json({
        messgae : 'Signed out successfully...!'
    });
}
