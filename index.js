const express = require('express');
const cors = require('cors');
const products = require('./products.json');
const fs = require('fs').promises;
const uid = require('uuid').v4;
const ProductRepository = require('./ProductRepository');

const PORT = process.env.PORT || 8000;

const app = express();
app.use(cors()); 
app.use(express.json());

app.get('/',async (req,res) => {
    const products = await ProductRepository.getAll();
    res.json({msg : 'Success',data : products});
});

app.get('/search',async (req,res) => {
    let {name} = req.body;
    const products = await ProductRepository.getProductByName(name);
    res.json({msg : 'Success',data : products});
});

app.post('/create',async (req,res) => {
    const {name,price} = req.body;
    if(!name || !price){
        res.status(400).json({status : "Bad Request"});
    }else{
        await ProductRepository.createProduct({name,price});
        res.status(201).json({msg:'Success',data:{name,price}});
    }
})

app.get('/searchByID/:id',async(req,res) => {
    const id = req.params.id;
    const product = await ProductRepository.getProductByID(id);
    if(product){
        res.json({msg:'Success',data:product});
    }else{
        res.status(404).json({msg:'ID Not Found'});
    }
})

app.put('/update/:id', async (req,res) => {
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

app.delete('/delete/:id', async(req,res) => {
    const id = req.params.id;
    const product = await ProductRepository.getProductByID(id);
    if(product){
        await ProductRepository.deleteProduct(id);
        res.json({msg:'Success'});
    }else{
        res.status(404).json('not found');
    }
})

app.listen(PORT,() => {
    console.log(`Server is listening on ${PORT}`);
});

