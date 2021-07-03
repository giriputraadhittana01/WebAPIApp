const express = require('express');
const route = express.Router();
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();
route.post('/login', async(req,res) => {
    if(req.body.username && req.body.password){
        const token = jwt.sign({username:req.body.username},process.env.SECRET_KEY,{ expiresIn: 10 });
        res.json({msg:'Success',data:token});
    }else{
        res.status(401).send('Username and Password Must Be Fill');
    }
})

module.exports = route;