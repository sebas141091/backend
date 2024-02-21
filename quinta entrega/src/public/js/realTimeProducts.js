const socket = io();
const idEliminar= document.getElementById('id_eliminar');
const idBotonEliminar=document.getElementById('eliminar')
const MostrarProd=document.getElementById('mostrar__Prod')
const botonAgregar=document.getElementById('agregar')

//*******inputs */
const input=document.getElementById('title')

const inputTitle=document.getElementById('title')
const inputDesc=document.getElementById('desc')
const inputCode=document.getElementById('code')
const inputPrice=document.getElementById('price')
const inputStatus=document.getElementById('status')
const inputStock=document.getElementById('stock')
const inputCat=document.getElementById('cat')
const inputImg=document.getElementById('img')


let AgregProd=[]
botonAgregar.addEventListener('submit',(e)=>{
  e.preventDefault();
  AgregProd={
    title:inputTitle.value,
    description:inputDesc.value,
    code:inputCode.value,
    price:inputPrice.value,
    status:inputStatus.value,
    stock:inputStock.value,
    category:inputCat.value,
    thumbnail:inputImg.value
  }
  socket.emit('agregar',{AgregProd})


})


idBotonEliminar.addEventListener('click',()=>{
    socket.emit('elimina',idEliminar.value)

});

socket.on('mostrarProd', (data) => {
    let prod=[]
    MostrarProd.innerHTML='';
 prod=data.prod
   prod.forEach(log => {
      MostrarProd.innerHTML+=`
      <div> 
      <h1>${log.title}</h1>
      <h2>${log.description}</h2>
      <h3>${log.price}</h3>

      
      
      <div/>`
  })
   
});

