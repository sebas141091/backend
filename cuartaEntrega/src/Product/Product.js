import fs from 'fs'
class Product{
    constructor(id,title,description,code,price,status,stock,category,thumbnail){
        this.id =id;
        this.title=title;
        this.description=description;
        this.code=code;
        this.price=price;
        this.status=true;
        this.stock=stock;
        this.category=category;
        this.thumbnail=thumbnail;
    }
}

export class ProductManager{
    //variables
    #product;
    #Dir;
    #Path;
    #File;
    
    constructor(){
  
        this.#product=new Array();
        this.#Dir='.files'
        this.#Path=this.#Dir+'/Products.json'
        this.#File=fs
    }
    #CreateDirBase= async ()=>{
        await this.#File.promises.mkdir(this.#Dir,{recursive:true});
        if(!this.#File.existsSync(this.#Path)){
            await this.#File.promises.writeFile(this.#Path, "[]");
        }
    }

    addProduct= async (id,title,description,code,price,status,stock,category,thumbnail)=>{
        let newProduct= new Product(id,title,description,code,price,status,stock,category,thumbnail)
        try{
            await this.#CreateDirBase();
            this.#product= await this.getProduct();
            this.#product.push(newProduct);
            await this.#File.promises.writeFile(this.#Path,JSON.stringify(this.#product));
        }
        catch (error){
            console.log(`Error Creating new product : ${JSON.stringify(newProduct)},detail this error ${error}`);
            throw Error(`Error Creating new product : ${JSON.stringify(newProduct)},detail this error ${error}`)
        }
    }

    getProduct= async()=>{
        try{
            await this.#CreateDirBase();
            let productRead= await this.#File.promises.readFile(this.#Path,"utf-8");
            this.#product=JSON.parse(productRead); 
            return this.#product;
        }
        catch (error){
            console.log(`Error read  product : ${JSON.stringify(newProduct)},detail this error ${error}`);
            throw Error(`Error read  product : ${JSON.stringify(newProduct)},detail this error ${error}`)
        }
    }

    getProductById =async(id)=>{
        try{
            const prod = await this.getProduct(); 
            let objetoId= prod.find(productId=> productId.id==id )
            if(objetoId) 
                return objetoId;
            else
                return -1;
             
        }
        catch (error){
            console.log(`Error read  product : ${JSON.stringify(newProduct)},detail this error ${error}`);
            throw Error(`Error read  product : ${JSON.stringify(newProduct)},detail this error ${error}`)
        }

    }

    updateProduct =async(id,productModified)=>{
       try{        
            let products=await this.getProduct();
            const index =  products.findIndex(prod =>prod.id===id);
            if(index>-1){
                products[index]={id, ...productModified}
                await this.#File.promises.writeFile(this.#Path,JSON.stringify(products));
            } 
            else{
                console.log(`No se encontro producto con id ${id} para actualizar`)
            }       
        }
       catch(error){
            console.log(error)
       }
    }

    deleteProduct=async (id)=>{
        try{
            await this.#CreateDirBase();
            let productRead= await this.#File.promises.readFile(this.#Path,"utf-8");
            await this.#File.promises.writeFile(this.#Path,JSON.stringify(JSON.parse(productRead).filter(productId=> productId.id!==id )));
            return console.log(`The User with id : ${id} was deleted`)
        }
        catch (error){
            console.log(`Error delete  product : ${JSON.stringify(newProduct)},detail this error ${error}`);
            throw Error(`Error delete  product : ${JSON.stringify(newProduct)},detail this error ${error}`)
        }
    }
}