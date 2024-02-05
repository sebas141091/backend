import { ProductManager } from "./Product/Product.js";
let productManager=new ProductManager();

let products=async ()=>{
    try{
        await productManager.addProduct("title 1","description title 1",10,"http://google.com","code",1);
        await productManager.addProduct("title 2","description title 2",20,"http://google.com2","code2",2);
        await productManager.addProduct("title 3","description title 3",30,"http://google.com3","code3",3);
        await productManager.addProduct("title 4","description title 4",40,"http://google.com4","code4",4);
        await productManager.addProduct("title 5","description title 5",50,"http://google.com5","code5",5);
        await productManager.addProduct("title 6","description title 6",60,"http://google.com6","code6",6);
        await productManager.addProduct("title 7","description title 7",70,"http://google.com7","code7",7);
        await productManager.addProduct("title 8","description title 8",80,"http://google.com8","code8",8);
        await productManager.addProduct("title 9","description title 9",90,"http://google.com9","code9",9);
        await productManager.addProduct("title 10","description title 10",100,"http://google.com10","code10",10);
        
        console.log("*------------MUESTRO TODO los datos------------------------")
        let prod= await productManager.getProduct();
        console.log(prod);
        console.log("\n")
    }
    catch(error){
        console.log(error)
    }

}

 products();

