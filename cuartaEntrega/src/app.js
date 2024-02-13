import  Express  from "express";
import routesProd from "./Routes/Products.routes.js";
import routesCart from "./Routes/Carts.routes.js";
import _dirname from "../utils.js";

const PORT=8080;
const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({extended:true}));
app.use(Express.static(_dirname+'/src/public'))

app.use('/api/products',routesProd);
app.use('/api/carts',routesCart);


app.listen(PORT,()=>{
    console.log(`estamos en el puerto ${PORT}`)
})