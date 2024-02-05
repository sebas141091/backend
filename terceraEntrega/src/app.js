import {ProductManager} from "./Product/Product.js";
import  Express  from "express";

let prod = new ProductManager();
let productos = [];
productos=await prod.getProduct();

const app = Express();
const port = 9090;

app.get('/products',async(req,res)=>{
    try{
        res.send(productos)
    }
    catch (error){
        console.log(error)
    }
    
})


app.get('/products/query',async(req,res)=>{
    try {
        let {limit}=req.query;

            if(limit){
                let producto=[];
                for (let index = 0; index <parseInt(limit); index++) {
                    producto.push(productos[index])
                }
                res.json(producto)
            }
            else{
                res.json(productos)
            } 
        }
    catch (error) {
        console.log(`Hubo un error al mostrar los datos ${error}`);
    }
})

app.get('/products/:id',async(req,res)=>{
    try {
        let {id} = req.params;
        if (id){
            let productoId = await prod.getProductById(parseInt(id))
            productoId?res.send(productoId):res.send(`No se ha registrado un Id con el numero :${id}`) 
        }else{
            res.send(`no ha ingresado un id`)
        }
       
            
    } catch (error) {
        console.log(`Hubo un error al querer buscar el producto por Id ${error}`);
    }
})
app.listen(port,()=>{
    console.log(`estamos en el puerto ${port}`);
})

