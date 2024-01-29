
const ProductManager=require("../Product.js")

const productManager=new ProductManager();

productManager.addProduct("titulo","titulo del producto",100,"https:google.com","100$",10);
productManager.addProduct("titulo del producto5","",100);
productManager.addProduct("titulo2","titulo del producto2",200,"https:google2.com","200$",20);
productManager.addProduct("titulo3","titulo del producto3",300,"https:google3.com","300$",30);
productManager.addProduct("titulo del producto5","",100);

productManager.getProductById(2);

productManager.getProducts();
