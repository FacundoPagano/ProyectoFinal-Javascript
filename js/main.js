// Mensaje de bienvenida
let nombre= prompt("Ingrese su nombre")
alert ("Bienvenido " + nombre + ", a la tienda online de ropa Nikers, a continuacion eliga la prenda que desea comprar. Cualquier compra mayor a $20.000 tendra un descuento del 10%")

//Variables
let prenda = 0;
let totalFinal = 0;
const carrito = []

//Funciones
function elegirPrenda() {
    prenda = parseInt(prompt("Ingrese el numero de la prenda que desea adquirir: \n 1-Remera $2.500\n 2-Campera $5.000\n 3-Buzo $6.000\n 4-Pantalon $4.000\n 5-Zapatillas $8.000 \n 6-Finalizar compra"));
}

function productos(categoria,precio,id){
    this.categoria=categoria;
    this.precio=precio;
    this.id=id;
}

const remera= new productos("Remera",2500,1);
const campera= new productos("Campera",5000,2);
const buzo= new productos("Buzo",6000,3);
const pantalon= new productos("Pantalon",4000,4);
const zapatillas= new productos("Zapatillas",8000,5);


function agregarCarrito(productos) {
    carrito.push(productos)
}

function sumaTotal() {
    switch (prenda) {
        case 1:
            alert ("Usted selecciono Remera, se agregara el costo de $2500 a su carrito");
            totalFinal += remera.precio;
            agregarCarrito(remera);
            break;
        case 2:
            alert ("Usted selecciono Campera, se agregara el costo de $5000 a su carrito");
            totalFinal += campera.precio;
            agregarCarrito(campera);
            break;
        case 3:
            alert ("Usted selecciono Buzo, se agregara el costo de $6000 a su carrito");
            totalFinal += buzo.precio;
            agregarCarrito(buzo);
            break;
        case 4:
            alert ("Usted selecciono Pantalon, se agregara el costo de $4000 a su carrito");
            totalFinal += pantalon.precio;
            agregarCarrito(pantalon);
            break;
        case 5:
            alert ("Usted selecciono Zapatillas, se agregara el costo de $8000 a su carrito");
            totalFinal += zapatillas.precio;
            agregarCarrito(zapatillas);
            break;
        default:
            alert ("Opcion no valida, porfavor ingrese un numero del 1-5 para poder seguir con su compra su compra");
            break;
    }
    alert("Su total hasta el momento es de: $" + totalFinal);
    return totalFinal;
}

function sumarProductos() {
    const total = carrito.reduce(
      (acc, el) => (acc += el.precio),0);
    const descuento = total - total * 0.15;
    if (total > 20000) {
      alert("Su compra es mayor a $20.000 por lo tanto obtiene un descuento del 15%. Su total es: " + descuento);
      console.log("Su compra es mayor a $20.000 por lo tanto obtiene un descuento del 15%. Su total es: " + descuento);
    } else {
      alert("Su total es de: " + resultado);
      console.log("Su total es de: " + resultado);
    }
  }

elegirPrenda();
while(prenda != 6){
   sumaTotal();
   elegirPrenda(); 
}

sumarProductos()
console.log(carrito);


