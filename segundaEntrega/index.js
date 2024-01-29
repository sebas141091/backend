const ProductManager= require('./Product.js');

let productManager=new ProductManager();

let products=async ()=>{
    try{
        await productManager.addProduct("title 2","description title 2",10,"http://google.com","code",1);
        await productManager.addProduct("title 1","description title 1",10,"http://google.com2","code2",2);
        await productManager.addProduct("title 3","description title 3",10,"http://google.com3","code3",3);
        
        console.log("*------------MUESTRO TODO los datos------------------------")
        let prod= await productManager.getProduct();
        console.log(prod);
        console.log("\n")

        console.log("*------------BUSCO SEGUN ID ------------------------")
        let productId= await productManager.getProductById(2);
        console.log(productId);
        console.log("\n")

        console.log("*------------ELIMINO SEGUN ID  ------------------------\n")
     await productManager.deleteProduct(2);
     console.log("\n")
        

        console.log("*------------MUESTRO TODO con el id eliminado ------------------------")
        let prodNew= await productManager.getProduct();
        console.log(prodNew);

        
        console.log("*------------REALIZO EL UPTDATE------------------------")
        const newProduct ={
            title:"title modified",
            description:"modified",
            price:100,
            thumbnail:"prueba modifie",
            code:"code modified",
            stock:1000
        }

       await productManager.updateProduct(3,newProduct);

        console.log("*------------MUESTRO TODO3 ------------------------")
        let prodNew1= await productManager.getProduct();
        console.log(prodNew1);

    }
    catch(error){

    }

}

 products();

