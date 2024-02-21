import { Router } from "express"
import { ProductManager } from "../Product/Product.js";

let productos=[];
let productManager=new ProductManager();
const routesProd=Router();


routesProd.get('/home',async(req,res)=>{
    try{
        productos=await productManager.getProduct();
        console.log(productos)
        res.render('home',{prod:productos}
        );
    }
    catch (error){
        console.log(error)
        return res.status(500).send({status:"error",message:error})
    }
    
})

routesProd.get('/realTimeProducts',async(req,res)=>{
    try{
       // productos=await productManager.getProduct();
      
        res.render('realTimeProducts'//,{prod:productos}
        );
    }
    catch (error){
        console.log(error)
        return res.status(500).send({status:"error",message:error})
    }
    
})


routesProd.post('/' ,async(req,res)=>{
    
    //productos=await productManager.getProduct();
    const {title,description,code,price,status,stock,category,img}=req.body;
    let id,repiteID,prodExist ;
    productos=await productManager.getProduct();
    //validamos que el id no se repita
    if(productos.length>=10){
        return res.send("no hay mas id para generar productos , elimine algun producto")
    }else{
        do {
            id = Math.floor(Math.random() * 10 + 1);
            
            repiteID = productos.find(prod => prod.id === id)
        }
        while (repiteID)
        if (!title || !description || !code || !price || !stock || !category || !img) {
            return res.status(400).send({ status: "error", error: "faltaba ingresar un campo" })
        }
        else {
            //validar que el producto todavia no exista antes de darlo de alta
            prodExist = productos.find(prod => prod.title === title)
    
            if(prodExist){
                return res.send({ status: "error", error: "el producto ya existe" })
            }else{
                productManager.addProduct(id,title,description,code,parseInt(price),status,stock,category,img);
                res.send({ status: "succes", message: `procuto dado de alta correctamente` })
            }
        
        }
    }
    
})

export default routesProd;