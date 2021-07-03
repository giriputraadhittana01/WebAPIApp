const express = require('express');
const route = express.Router();
const dotenv = require('dotenv');
const ProductRepository = require('../ProductRepository');
const {authenticateMiddleware} = require('../middlewares/middleware');
dotenv.config();

route.use(authenticateMiddleware);

route.get('/',async (req,res) => {
    const products = await ProductRepository.getAll();
    res.json({msg : 'Success',data : products});
});

route.get('/search',async (req,res) => {
    let {name} = req.body;
    const products = await ProductRepository.getProductByName(name);
    res.json({msg : 'Success',data : products});
});

route.post('/create',async (req,res) => {
    const {name,price} = req.body;
    if(!name || !price){
        res.status(400).json({status : "Bad Request"});
    }else{
        await ProductRepository.createProduct({name,price});
        res.status(201).json({msg:'Success',data:{name,price}});
    }
})

route.get('/searchByID/:id',async(req,res) => {
    const id = req.params.id;
    const product = await ProductRepository.getProductByID(id);
    if(product){
        res.json({msg:'Success',data:product});
    }else{
        res.status(404).json({msg:'ID Not Found'});
    }
})

route.put('/update/:id', async (req,res) => {
    const id = req.params.id;
    const product = await ProductRepository.getProductByID(id);
    if(product){
        const {name,price} = req.body;
        await ProductRepository.updateProduct(id,{name,price});
        res.json({msg:'Success'});
    }else{
        res.status(404).json({msg:'ID Not Found'});
    }
});

route.delete('/delete/:id', async(req,res) => {
    const id = req.params.id;
    const product = await ProductRepository.getProductByID(id);
    if(product){
        await ProductRepository.deleteProduct(id);
        res.json({msg:'Success'});
    }else{
        res.status(404).json('not found');
    }
})

module.exports = route;