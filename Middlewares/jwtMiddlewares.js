const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    console.log("Inside jwtMiddleware");
    const token = req.headers['authorization'].split(" ")[1]
    try{
        const jwtResponse = jwt.verify(token,"supersecretkeyrecipebook12")
        req.payload = jwtResponse.userId
        next()
    }catch(err){
        res.status(401).json("Authorization failed!! Please Login..")
    }
}

module.exports = jwtMiddleware