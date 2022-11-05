const jwt = require('jsonwebtoken') ;
require('dotenv').config() ;


function verifyToken(req,res,next){

    const token = req.cookies.access_token ;
    
    let jwtSecretKey = process.env.JWT_SECRET_KEY ;
    const verified = jwt.verify(token, jwtSecretKey) ;

    if(verified){
        console.log('Successfully verified') ;
        next();
    }
    else{
        res.status(401).send({msg:'Access denied'}) ;
    }
}

module.exports = {verifyToken} ;