//Variables
const bienvenida= document.getElementById("bienvenida");
const titulo= document.getElementById("titulo")
const carrito = document.querySelector('#carrito');
const listaProductos = document.querySelector('#catalogo');
const contenedorCarrito = document.querySelector('#carrito-obj tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar');
const comprarBtn = document.querySelector('#compra')
let articulosCarrito = {};
let totalCarrito = 0;
let inicio = 100000;
let fin = 999999;
let numeroRandom = inicio + Math.floor(Math.random()*fin)
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

     comprarBtn.addEventListener('click', finalizarCompra);

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

function sacarTotalCarrito() {
     totalCarrito = articulosCarrito.reduce ((anterior, articulo)=> { return anterior + (articulo.precio*articulo.cantidad)},0)
}

function leerDatosProducto(producto) {
     const infoProducto = {
          imagen: producto.querySelector('img').src,
          titulo: producto.querySelector('h3').textContent,
          precio: producto.querySelector('.precio').textContent,
          material: producto.querySelector('.material').textContent,
          cantidad: 1,
          id: producto.querySelector('button').getAttribute('data-id')
     }

     if( articulosCarrito.some( producto => producto.id === infoProducto.id ) ) { 
          const productos = articulosCarrito.map( producto => {
               if( producto.id === infoProducto.id ) {
                    producto.cantidad++;
                     return producto;
                } else {
                     return producto;
             };
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
               <td>${producto.cantidad} </td>
               <td>${producto.precio*producto.cantidad}</td>
               <td><button class="borrar-producto" data-id="${producto.id}">X</button>
               </td>
          `;
          contenedorCarrito.appendChild(row);
     });
     
     document.querySelector('#total-carrito').innerHTML = "$" + totalCarrito;

     cargarStorage()
}

function vaciarCarrito() {

     
     while(contenedorCarrito.firstChild) {
          contenedorCarrito.removeChild(contenedorCarrito.firstChild);
          vaciarStorage();
      }

      sacarTotalCarrito();

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

function finalizarCompra() {
     Swal.fire({
          title: 'Desea finalizar la compra? Se le asignara un numero de pedido para retirar en el local',
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: 'Si',
          denyButtonText: `No`,
        }).then((result) => {
          if (result.isConfirmed) {
               Swal.fire({
                    title: 'Muchas Gracias!',
                    text: "Su numero de pedido es: N°" + numeroRandom,
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Finalizar'
                  }).then((result) => {
                    if (result.isConfirmed) {
                    vaciarCarrito()
                    }
                  })
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
                    <p class="precio">${item.precio}</p>
                    <p class="material">${item.material}</p>
                    <button class="agregar-carrito" data-id="${item.id}">Agregar al carrito</button>
               </div>
          </div>
          `;
          listaProductos.append(div)
     });
}) 