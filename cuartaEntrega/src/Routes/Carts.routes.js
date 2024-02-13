import { Router } from "express";
import {CartManager} from "../Cart/Cart.js"

let cartManager=new CartManager();
const routesCart=Router();



routesCart.get('/:cid',async(req,res)=>{
    const {cid}=req.params;
    try {
        const cart = await cartManager.getCartProdId(parseInt(cid));
        if(!cart)
            res.status(400).send({status:"no se ha encontrado un carrito"})
        else        
            res.json(cart);
    
    } catch (error) {
        return res.status(500).send({status:"error",message:error})
    }
})

routesCart.post('/',async(req,res)=>{
    try {
        const cart = await cartManager.newCart();
        res.send({status:"succes",message:`carrito generado correctamente`})
    } catch (error) {
        res.send({status:"error" , message:`Hubo un error al generar le carrito ${JSON.parse(error)}`})
    }
})

routesCart.post('/:cid/product/:pid',async(req,res)=>{
    const {cid,pid}= req.params; 
    try {
        const cart= await cartManager.addProducToCart(parseInt(cid),parseInt(pid));
        if(cart)
            res.send({status:"succes" ,message:"Producto generado correctamente"});
        else
            res.send({status:"error" ,message:"Producto no se ha generado correctamente"});
        } catch (error) {
        res.send(error)
    }
})

export default routesCart;