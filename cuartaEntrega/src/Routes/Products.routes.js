import { Router } from "express"
import { ProductManager } from "../Product/Product.js";
import { apploader } from "../../utils.js";
let productos=[];
let productManager=new ProductManager();
const routesProd=Router();

routesProd.get('/',async(req,res)=>{
    try{
        productos=await productManager.getProduct();
        res.send(productos)
    }
    catch (error){
        console.log(error)
        return res.status(500).send({status:"error",message:error})
    }
    
})

routesProd.get('/query',async(req,res)=>{
    try {
        productos=await productManager.getProduct();
            let {limit}=req.query;
            if(parseInt(limit)>0){            
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
        }
    catch (error) {
        res.send(`Hubo un error al mostrar los datos ${error}`);
    }
})

routesProd.get('/:pid',async(req,res)=>{
    try {
        let {pid} = req.params;
        console.log(pid)
        if (pid){
            let productoId = await productManager.getProductById(parseInt(pid))
            if(productoId !=-1){
                res.send(productoId)
            }else{
                res.send({status:"information",message:`no se ha encontrado ningun producto con id: ${pid}`}) 
            }
        }else{
            return res.status(400).send({status:"error",message:`no se ha ingresado id `})
        }
    } catch (error) {
        return res.send({status:"error",message:`Hubo un error al querer buscar el producto por Id ${error}`})
    }
})

routesProd.post('/',apploader.single('file') ,async(req,res)=>{
    
    //productos=await productManager.getProduct();
    const {title,description,code,price,status,stock,category}=req.body;
    let id,repiteID,prodExist ;
    let img = req.file.path;
    productos=await productManager.getProduct();
    if(!req.file){
        return res.status(400).send({ status: "error", error: "No se adjunto archivo" })
    }
    //validamos que el id no se repita
    console.log(productos.length)
    if(productos.length>=10){
        console.log("estoy acac")
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
            console.log(`estamnos ${prodExist}`)
            if(prodExist){
                return res.send({ status: "error", error: "el producto ya existe" })
            }else{
                productManager.addProduct(id,title,description,code,parseInt(price),status,stock,category,img);
                res.send({ status: "succes", message: `procuto dado de alta correctamente` })
            }
        
        }
    }
    
})

routesProd.put('/:pid',async(req,res)=>{
    const {pid} = req.params;
    try {
        let {title,description,code,price,status,stock,category}= req.body;
        let productoId = await productManager.getProductById(parseInt(pid));
        const thumbnail = productoId.thumbnail;
        if(productoId!=1){
            if (!title || !description || !code || !price || !stock || !category || !status) {
                return res.status(400).send({ status: "error", error: "faltaba ingresar un campo" })
            }
            else {
                await productManager.updateProduct(parseInt(pid),{title,description,code,price,status,stock,category,thumbnail});
                res.send({status:"succes",message:`producto con id: ${pid} se modifico correctamente`}) 
            }
        }
        else{
        res.send({status:"information",message:`no se ha encontrado ningun producto con id: ${pid} para actualizar`}) 
        }
    } catch (error) {
        res.send({status:"error",message:`Se ha generado un error : ${error}`})
    }

})


routesProd.delete('/:id',async(req,res)=>{
    try {
        let {id} = req.params;
        if (id){
            let productoId = await productManager.getProductById(parseInt(id));
            if(productoId){
                await productManager.deleteProduct(parseInt(id))
                res.send({status:"succes",message:`producto con id: ${id} eliminado correctamente`}) 
            }else{
                res.send({status:"information",message:`no se ha encontrado ningun producto con id: ${id} para eliminar`}) 
            }
            
            
        }else{
            return res.status(400).send({status:"error",message:`no se ha ingresado id `})
        }
    } catch (error) {
        return res.send({status:"error",message:`Hubo un error al querer buscar el producto por Id ${error}`})
    }

})

export default routesProd;