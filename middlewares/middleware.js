const dotenv = require('dotenv');
dotenv.config();
const authenticateMiddleware = (req,res,next) => {
    if(req.headers.token==process.env.SECRET_KEY){
        next();
    }else{
        res.status(401).send('Unauthorize');
    }
}

module.exports = {authenticateMiddleware};