class ProductManager{
    constructor(){
        
        this.products=[];
    }    
    addProducts(title,description,price,thumbnail,code,stock){
       if(title!=="" && description!=="" && price!=="" && thumbnail!=="" && code!=="" && stock!==""){

            let titulos = this.products.find(i=>(
                i.title===title
            ))

            if(!titulos){
                
                const Product={
                id:this.products.length+1,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
                }
                    
                this.products.push(Product)
            }
            else{
                return console.log("el codigo repetido no se guardan datos")
            }
        }
        else{
           return console.log("no se puede tener campos vacios")
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
const productManager=new ProductManager();

productManager.addProducts("titulo","titulo del producto",100,"https:google.com","100$",10);
productManager.addProducts("titulo del producto5","",100);
productManager.addProducts("titulo2","titulo del producto2",200,"https:google2.com","200$",20);
productManager.addProducts("titulo3","titulo del producto3",300,"https:google3.com","300$",30);
productManager.addProducts("titulo del producto5","",100);

productManager.getProductById(6);

productManager.getProducts();
