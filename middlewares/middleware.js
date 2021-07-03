const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();
const authenticateMiddleware = (req,res,next) => {
    if(req.headers.token){
        try {
            jwt.verify(req.headers.token,process.env.SECRET_KEY);
            next();
        } catch (error) {
            res.status(401).send('Token Not Valid');
        }
    }else{
        res.status(401).send('Unauthorize');
    }
}

module.exports = {authenticateMiddleware};