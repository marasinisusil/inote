const jwt = require('jsonwebtoken');
const JWT_SECRET = 'iamgood';
const fetchuser=(req,res,next)=>{
    const token =req.header('auth-token')
    // get the jwt token and add to req object
    if(!token){
        res.status(401).send({error:"authenticated with valid user token"})
    } 
    try {
        const data=jwt.verify(token,JWT_SECRET )
        req.user=data.user;
        next()
    } catch (error) {
        res.status(401).send({error:"authenticated with valid user token"})
    }

}
module.exports = fetchuser;