let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"));

const listaProductos = document.querySelector(".lista-productos");
let resumenPrecioTotal = document.querySelector("#resumen-precio-total");
const nombreUsuario = document.querySelector("#nombre-usuario");
const apellidoUsuario = document.querySelector("#apellido-usuario");
const direccionUsuario = document.querySelector("#direccion-usuario");
const emailUsuario = document.querySelector("#email-usuario");
const ciudadUsuario = document.querySelector("#ciudad-usuario");
const codigoPostalUsuario = document.querySelector("#cpostal-usuario");
const botonFinalizarPedido = document.querySelector("#finalizar-pedido");
const form = document.getElementById("form");
const main = document.getElementById("main");

function cargarResumenProductos() {
  productosEnCarrito.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("resumen-productos");
    div.innerHTML = `${producto.nombre} x ${producto.cantidad} = $${producto.precio * producto.cantidad}`;

    listaProductos.append(div);
  });
}

function actualizarTotalResumen() {
  const sumaPrecios = productosEnCarrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
  resumenPrecioTotal.innerText = `$${sumaPrecios}`;
}

cargarResumenProductos();
actualizarTotalResumen();

class Pedido {
  constructor(productos) {
    this.productos = productos;
    this.emailUsuario = "";
    this.nombreUsuario = "";
    this.apellidoUsuario = "";
    this.direccionUsuario = " ";
    this.ciudadUsuario = " ";
    this.codigoPostalUsuario = " ";
  }
}

let pedido = new Pedido(productosEnCarrito);

function finalizarCompra() {
  main.innerHTML = " ";
  productosEnCarrito.length = 0;
  localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
  console.log("pedido realizado");
  Swal.fire({
    title: "¡Muchas gracias por tu compra!",
    text: `Enviaremos un email a ${pedido.emailUsuario} con el comprobante de tu compra`,
    icon: "success",
    confirmButtonText: "OK!",
    background: "black",
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  pedido.emailUsuario = emailUsuario.value;
  pedido.nombreUsuario = nombreUsuario.value;
  pedido.apellidoUsuario = apellidoUsuario.value;
  pedido.direccionUsuario = direccionUsuario.value;
  pedido.ciudadUsuario = ciudadUsuario.value;
  pedido.codigoPostalUsuario = codigoPostalUsuario.value;

  finalizarCompra();

  console.log(pedido);
});
