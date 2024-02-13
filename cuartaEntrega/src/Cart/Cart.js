import fs from 'fs'

export class CartManager{
    #cart;
    #Dir;
    #Path;
    #File;
    
    constructor(){
        this.#cart=new Array();
        this.#Dir='.files'
        this.#Path=this.#Dir+'/CartManager.json'
        this.#File=fs
    }
  
    #CreateDirBase= async ()=>{
        await this.#File.promises.mkdir(this.#Dir,{recursive:true});
        if(!this.#File.existsSync(this.#Path)){
            await this.#File.promises.writeFile(this.#Path, "[]");
        }
    }
    getCarts = async () =>{
        await this.#CreateDirBase();
        let resp= await this.#File.promises.readFile(this.#Path,"utf-8");
        const respJson= JSON.parse(resp);
        return respJson;
    }

    getCartProdId = async (id)=>{
        const carts= await this.getCarts();
        const cart = carts.find(cId =>cId.id===id)
        if(cart) 
            return cart.products
        else
            console.log("No se encontro carrito")
    }

    newCart = async()=>{
        await this.#CreateDirBase();
        
        let id = Math.floor(Math.random() * 10 + 1);

        const newCart = {id,products:[]};
        this.#cart=await this.getCarts();

        this.#cart.push(newCart)

        await this.#File.promises.writeFile(this.#Path,JSON.stringify(this.#cart));
        return newCart;
    }
    addProducToCart =async(cid,pid)=>{
        const cart = await this.getCarts();
        const indexCart= cart.findIndex(cart=>cart.id===cid)
        if(indexCart>-1){
            const cartProd= await this.getCartProdId(cid);
            const existProdInd=cartProd.findIndex(cprod=>cprod.pid===pid);
            if(existProdInd>-1){
                cartProd[existProdInd].quantity=cartProd[existProdInd].quantity+1;
            }else{
                cartProd.push({pid,quantity:1});
            }
            cart[indexCart].products=cartProd;
            await this.#File.promises.writeFile(this.#Path
                ,JSON.stringify(cart))
        return true;

        }else{
            console.log("no se encontro nada");
            return false;
        }

    }


}