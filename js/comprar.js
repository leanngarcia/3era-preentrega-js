let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"));

const botonComprar = document.getElementById("confirmarCompra");

function finalizarCompra() {
  productosEnCarrito.length = 0;
  localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

botonComprar.addEventListener("click", finalizarCompra);
