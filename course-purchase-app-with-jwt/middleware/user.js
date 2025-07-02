const {JWT_SECRET}=require("../config")
function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const token=req.headers.authorization;
    const splitter=token.split(" ");
    const jwtToken=splitter[1];
    const decoded=jwt.verify(jwtToken,JWT_SECRET);
    if(decoded.username){
        req.userame=decoded.username;
        next();
    }
    else{
        res.status(403).json({
            msg:"Not Authorized"
        })
    }
}

module.exports = userMiddleware;
