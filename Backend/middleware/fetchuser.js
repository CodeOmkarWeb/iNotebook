const jwt = require('jsonwebtoken');
const JWD_SECRET = 'omkarisag**db*y'

const fetchuser = (req,res,next)=>{
    // Get the user from the jwt tokem and add it to req object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please authenticate using a valid token "})
    }
    try {
        const data = jwt.verify(token , JWD_SECRET)
        req.user = data.user;
        next()
        
    } catch (error) {
        res.status(401).send({error:"Please authenticate using a valid token "})
    }
}
module.exports = fetchuser;