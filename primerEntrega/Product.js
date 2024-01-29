class ProductManager{
    constructor(){
        
        this.products=[];
    }    
    addProduct(title,description,price,thumbnail,code,stock){
       
            let existingCode  = this.products.find(i=>(
                i.code===code
                
            ))

        if(!existingCode )
        {
            const Product={
            id:this.products.length+1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
            }  

            const fs= require('fs');
            if(!Object.values(Product).includes(undefined))
            {
                this.products.push(Product)
            }
            else{
                 return console.log("no se puede tener campos vacios")
            }
        }
        else{
            return console.log("error por codigo duplicado")
        }
        
    }

    getProducts(){
        return console.log(this.products);
    }

    getProductById(id){
        let idEsta = this.products.find(i=>(
            i.id===id
        ))

        idEsta?console.log(idEsta):console.log("not found");
    }
}
module.exports=ProductManager;