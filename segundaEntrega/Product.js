class Product{
    #id=0;
    constructor(id,title,description,price,thumbnail,code,stock){
        this.id=id;
        this.title=title;
        this.description=description;
        this.price=price;
        this.thumbnail=thumbnail;
        this.code=code;
        this.stock;

    }
}
class ProductManager{
    //variables
    #product;
    #Dir;
    #Path;
    #File;
    
    constructor(){
        this.#product=new Array();
        this.#Dir='.files'
        this.#Path=this.#Dir+'/Products.json'
        this.#File=require('fs')
    }
    #CreateDirBase= async ()=>{
        await this.#File.promises.mkdir(this.#Dir,{recursive:true});
        if(!this.#File.existsSync(this.#Path)){
            await this.#File.promises.writeFile(this.#Path, "[]");
        }
    }

    addProduct= async (title,description,price,thumbnail,code,stock)=>{
    
        let newProduct= new Product(this.#product.length+1,title,description,price,thumbnail,code,stock)
        try{
            await this.#CreateDirBase();
            
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
            await this.#CreateDirBase();
            let productRead= await this.#File.promises.readFile(this.#Path,"utf-8");
            this.#product=JSON.parse(productRead); 
            let objetoId= this.#product.find(productId=> productId.id===id )
            return objetoId;
        }
        
        catch (error){
            console.log(`Error read  product : ${JSON.stringify(newProduct)},detail this error ${error}`);
            throw Error(`Error read  product : ${JSON.stringify(newProduct)},detail this error ${error}`)
        }

    }

    updateProduct =async(id,productModified)=>{
       try{
        let objeto= await this.getProductById(id);

        //***********obtengo el objeto a modificar ********* */
        await this.deleteProduct(id);
       objeto.title=productModified.title;
        objeto.description=productModified.description;
        this.#product.push(objeto);
         console.log(this.#product);
       await this.#File.promises.writeFile(this.#Path,JSON.stringify(this.#product));

        console.log(`Product was modified`);
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

module.exports=ProductManager;