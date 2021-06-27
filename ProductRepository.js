const fs = require('fs').promises;
const uid = require('uuid').v4;

class ProductRepository{    
    static async getAll(){
        const products = JSON.parse(await fs.readFile('./products.json'));
        return products;
    }

    static async getProductByName(name){
        let product = name || "";
        const products = await ProductRepository.getAll();
        const filterProduct = products.filter((item) => item.name.includes(product));
        return filterProduct;
    }

    static async createProduct(data){
        const products = await ProductRepository.getAll();
        products.push({id:uid(),name:data.name,price:data.price});
        await ProductRepository.writeFile(products);
    }

    static async getProductByID(id){
        const products = JSON.parse(await fs.readFile('./products.json'));
        const product = products.find((item) => item.id == id);
        return product;
    }

    static async updateProduct(id,data){
        const products = await ProductRepository.getAll();
        const updateProduct = products.map((item) => {
            if(item.id == id){
                return {
                    ...item,
                    id : item.id,
                    name : data.name,
                    price : data.price
                }
            }else{
                return item;
            }
        })
        await ProductRepository.writeFile(updateProduct);
    }

    static async deleteProduct(id){
        const products = await ProductRepository.getAll();
        const updatedProduct = products.filter((item) => {
            if(item.id == id){
                return false;
            }else{
                return true;
            }
        })
        await ProductRepository.writeFile(updatedProduct);
    }

    static async writeFile(products){
        await fs.writeFile('./products.json',JSON.stringify(products,null,2));
    }
}

module.exports = ProductRepository;