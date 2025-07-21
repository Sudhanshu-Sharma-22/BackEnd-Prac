const {JWT_SECRET} = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware= function (req,res,next){
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({
            msg : "Not Authorized"
        })
    }

    const token = authHeader.split(' ')[1];
    // console.log(token)
    // console.log(JWT_SECRET)
    try{
        const decoded = jwt.verify(token,JWT_SECRET);
        // console.log(decoded);
        if(decoded.newUserId){
            req.userID=decoded.newUserId;
            next();
        }
        else{
            return res.status(403).json({
                msg : "Error Authenticating the User"
            })
        }
        
    }catch(err){
        return res.status(403).json({
            msg : "Error Authenticating the User"
        })
    }
}

module.exports={
    authMiddleware
}