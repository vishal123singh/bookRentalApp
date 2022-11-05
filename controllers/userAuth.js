require('dotenv').config();
const { User } = require('../models/userTable');
const  bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


function signUp(req,res){
    let { name,email,password } = req.body;
    
    
        bcrypt.genSalt(10, function(err,salt){
            if(err){
                console.log('Encryption failed',err);
                return;
            }
                bcrypt.hash(password, salt, async function(err,hash){
                    if(err){
                        console.log('Encryption failed', err);
                        return;
                    }
                    try{
                        password = hash;
                        await User.create({name,email,password}); 
                        res.status(200).send({msg: 'You have signed up successfully'});
                    }
                    catch(error){
                       res.status(500).send({msg:'Internal server error',error});
                    }
                    
                })
            })
           
        }


async function signIn(req,res){

    const{email, password} = req.body;

    try{
        var user = await User.findOne({
            where:{
                email:email
            }
           
        });
        const hash = user.dataValues.password;
        
        bcrypt.compare(password, hash).then( match => {
            
           if(match) {
            
            let jwtSecretKey = process.env.JWT_SECRET_KEY ;
            let data = {userId: user.dataValues.id} ; 
           // let headerKey = process.env.TOKEN_HEADER_KEY ;
              
            const token = jwt.sign(data, jwtSecretKey) ; 
            
            return res.cookie("access_token", token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                    }).status(200)
                    .json({ message: "👍 Logged in successfully" }); 
            
           }
           else{
            res.status(400).send({msg:'😲 Either your email or password is incorrect'}) ;
           }
        })
            
        .catch(err => res.status(500).send({msg:'Can not process your request now',err})) ;
        
    }
    catch(error){
        if(user === null){
            res.status(400).send({msg:'Email Id not found'});
        }
        else{
            res.status(500).send({msg:'Internal server error',error});
        }
       
    }

}


async function logOut(req,res){

    const token = req.cookies.access_token ;

}


        
module.exports = {signUp, signIn};
   
