let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"));

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCompraFinalizada = document.querySelector("#carrito-compra-finalizada");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#vaciar-carrito");
let precioTotal = document.querySelector("#precio-total");
let botonComprar = document.querySelector("#carrito-acciones-comprar");
const contadorCarrito = document.getElementById("contador-carrito");

function cargarProductosCarrito() {
  if (productosEnCarrito && productosEnCarrito.length > 0) {
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.remove("disabled");
    contenedorCarritoAcciones.classList.remove("disabled");
    contenedorCompraFinalizada.classList.add("disabled");

    contenedorCarritoProductos.innerHTML = "";

    productosEnCarrito.forEach((producto) => {
      const div = document.createElement("div");
      div.classList.add("carrito-producto");
      div.innerHTML = `
            <img class="carrito-producto-imagen" src=".${producto.imagen}" alt="${producto.nombre}" />

            <div class="carrito-producto-titulo">
              <small>Producto:</small>
              <h3>${producto.marca} ${producto.nombre}</h3>
            </div>

            <div class="carrito-producto-cantidad">
              <small>Cantidad:</small>
              <p>${producto.cantidad}</p>
            </div>

            <div class="carrito-producto-precio">
              <small>Precio:</small>
              <p>$${producto.precio}</p>
            </div>

            <div class="carrito-producto-subtotal">
              <small>Subtotal:</small>
              <p>$${producto.precio * producto.cantidad}</p>
            </div>

            <button class="carrito-producto-eliminar border-0" id="${producto.id}"><i class="bi bi-trash"></i></button>
    `;

      contenedorCarritoProductos.append(div);
    });
  } else {
    contenedorCarritoVacio.classList.remove("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCompraFinalizada.classList.add("disabled");
  }
  actualizarBotonesEliminar();
  actualizarTotal();
  actualizarContadorCarrito();
}

cargarProductosCarrito();

function actualizarBotonesEliminar() {
  botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", eliminarDelCarrito);
  });
}

function eliminarDelCarrito(e) {
  const idBoton = e.currentTarget.id;
  const index = productosEnCarrito.findIndex((producto) => producto.id === idBoton);

  if (productosEnCarrito[index].cantidad > 1) {
    productosEnCarrito[index].cantidad--;
    cargarProductosCarrito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
  } else {
    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
  }
}

function vaciarCarrito() {
  productosEnCarrito.length = 0;
  localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
  cargarProductosCarrito();
}

botonVaciar.addEventListener("click", vaciarCarrito);

function actualizarTotal() {
  const sumaPrecios = productosEnCarrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
  precioTotal.innerText = `$${sumaPrecios}`;
}

actualizarContadorCarrito();

function actualizarContadorCarrito() {
  let nuevoContadorCarrito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
  contadorCarrito.innerHTML = nuevoContadorCarrito;
}

