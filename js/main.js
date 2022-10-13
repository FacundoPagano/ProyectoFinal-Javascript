//Variables
const bienvenida= document.getElementById("bienvenida");
const titulo= document.getElementById("titulo")
const carrito = document.querySelector('#carrito');
const listaProductos = document.querySelector('#catalogo');
const contenedorCarrito = document.querySelector('#carrito-obj tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar'); 
let articulosCarrito = [];


//Funciones

//Procedimiento
bienvenida.innerText= "Bienvenido a la tienda online de ropa Nikers.";
titulo.innerText= "NIKERS"

// Listeners
cargarEventListeners();

function cargarEventListeners() {
     listaProductos.addEventListener('click', agregarProducto);

     carrito.addEventListener('click', eliminarProducto);

     vaciarCarritoBtn.addEventListener('click', vaciarCarritoNotificacion);

     document.addEventListener('DOMContentLoaded', () => {
          articulosCarrito = JSON.parse( localStorage.getItem('articulosCarrito') ) || []  ;
          console.log(articulosCarrito);
          carritoHTML();
     });

}

// Funciones
function agregarProducto(e) {
     e.preventDefault();

     if(e.target.classList.contains('agregar-carrito')) {
          const producto = e.target.parentElement.parentElement;

          leerDatosProducto(producto);
     }
}

function totalProducto(){
     leerDatosProducto();
     if(producto.cantidad === 1){
          producto.precio;
          return producto;
     } else {
          producto.precio * producto.cantidad;
          return producto
     }
     
}

function leerDatosProducto(producto) {
     const infoProducto = {
          imagen: producto.querySelector('img').src,
          titulo: producto.querySelector('h3').textContent,
          precio: producto.querySelector('.precio').textContent,
          material: producto.querySelector('.material').textContent,
          id: producto.querySelector('button').getAttribute('data-id'),
          cantidad: 1
     }

     if( articulosCarrito.some( producto => producto.id === infoProducto.id ) ) { 
          const productos = articulosCarrito.map( producto => {
               if( producto.id === infoProducto.id ) {
                    producto.cantidad++;
                     return producto;
                } else {
                     return producto;
             }
          })
          articulosCarrito = [...productos];
     }  else {
          articulosCarrito = [...articulosCarrito, infoProducto];
     }

     console.log(articulosCarrito)

     
     carritoHTML();
}

function eliminarProducto(e) {
     e.preventDefault();
     if(e.target.classList.contains('borrar-producto') ) {
          const productoId = e.target.getAttribute('data-id')
          
          articulosCarrito = articulosCarrito.filter(producto=> producto.id !== productoId);

          carritoHTML();
     }
}

function carritoHTML() {

     vaciarCarrito();

     articulosCarrito.forEach(producto => {
          const row = document.createElement('tr');
          row.innerHTML = `
               <td>  
                    <img src="${producto.imagen}" width=100 height=100>
               </td>
               <td>${producto.titulo}</td>
               <td>${producto.material} </td>
               <td>${producto.precio}</td>
               <td>${producto.cantidad} </td>
               <td><button class="borrar-producto" data-id="${producto.id}">X</button>
               </td>
          `;
          contenedorCarrito.appendChild(row);
     });
     
     cargarStorage()
}

function vaciarCarrito() {

     
     while(contenedorCarrito.firstChild) {
          contenedorCarrito.removeChild(contenedorCarrito.firstChild);
          vaciarStorage();
      }
}

function cargarStorage(){
     localStorage.setItem('articulosCarrito',JSON.stringify(articulosCarrito))
}

function vaciarStorage() {
     localStorage.clear();
     location. reload();
}

function vaciarCarritoNotificacion(){
     Swal.fire({
          title: 'Desea vaciar el carrito?',
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: 'Si',
          denyButtonText: `No`,
        }).then((result) => {
          if (result.isConfirmed) {
            vaciarCarrito()
          }
        })
}



fetch("./js/data.json")
.then((data)=>data.json())
.then((prod)=>{
     prod.forEach(item=>{
          const div = document.createElement('div');
          div.innerHTML=`
          <div class="objeto">
               <img class="imagen" src="${item.imagen}">
               <div>
                    <h3>${item.nombre}</h3>
                    <p class="precio">$ ${item.precio}</p>
                    <p class="material">${item.material}</p>
                    <button class="agregar-carrito" data-id="${item.id}">Agregar al carrito</button>
               </div>
          </div>
          `;
          listaProductos.append(div)
     });
})