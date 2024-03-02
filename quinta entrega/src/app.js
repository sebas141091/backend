import  Express  from "express";
import routesProd from "./Routes/Products.routes.js";
import routesCart from "./Routes/Carts.routes.js";
import _dirname from "./utils.js";
import { Server } from "socket.io"
import handlebars from 'express-handlebars'
import { ProductManager } from "./Product/Product.js";

let productManager=new ProductManager();
const PORT=8080;
const app = Express();
//config
app.use(Express.json());
app.use(Express.urlencoded({extended:true}));
app.use(Express.static(_dirname+'/public'))

app.engine('handlebars',handlebars.engine());
app.set ('views',_dirname+'/views');
app.set('view engine','handlebars');


//routes
app.use('/api/products',routesProd);
app.use('/api/carts',routesCart);


const http= app.listen(PORT,()=>{
    console.log(`estamos en el puerto ${PORT}`)
})
let prod=[]
const socketServer = new Server(http);

socketServer.on('connection', async(socket)=>{
    
    console.log("nuevo cliente conectado")
    /******agregamos un nuevo producto******* */
    socket.on('agregar',async(data)=>{
        let datosAg=[]
        datosAg=data.AgregProd;
        let id,repiteID,prodExist;
        let productos=[]
        productos=await productManager.getProduct();
        
        //validamos que el id no se repita
        if(productos.length>=10){
            console.log("no hay mas id para generar productos , elimine algun producto")
        }else{
            do {
                id = Math.floor(Math.random() * 10 + 1);
                
                repiteID = productos.find(prod => prod.id === id)
            }
            while (repiteID)
            if (!datosAg.title || !datosAg.description || !datosAg.code || !datosAg.price || !datosAg.stock || !datosAg.category || !datosAg.thumbnail) {
                console.log("faltaba un dato por agregar , no se agrego")
            }
            else {
                //validar que el producto todavia no exista antes de darlo de alta
                 prodExist = productos.find(prod => prod.title === datosAg.title)
        
                if(prodExist){
                    console.log( "el producto ya existe" );
                }else{
                    productManager.addProduct(id,datosAg.title,datosAg.description,datosAg.code,parseInt(datosAg.price),datosAg.status,datosAg.stock,datosAg.category,datosAg.thumbnail);
                    console.log("procuto dado de alta correctamente");
                    setTimeout(async() => {
                        prod= await productManager.getProduct();
                        socketServer.emit('mostrarProd',{prod}) 
                    }, 100);
                    
                }
            
            }
        }

    })


    //**** para eliminar por id***** */
    prod= await productManager.getProduct();
    socket.emit('mostrarProd',{prod})
    socket.on('elimina',async(data)=>{
        let productoId = await productManager.getProductById(parseInt(data));
        if(productoId != -1){
            await productManager.deleteProduct(parseInt(data))
            console.log("se elimino correctamente")
            prod= await productManager.getProduct();
            socketServer.emit('mostrarProd',{prod})

        }else{
             console.log("no se elimino ")
        }
        
    })
})