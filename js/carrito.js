const productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"));

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCompraFinalizada = document.querySelector("#carrito-compra-finalizada");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

function cargarProductosCarrito() {
  if (productosEnCarrito) {
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.remove("disabled");
    contenedorCarritoAcciones.classList.remove("disabled");
    contenedorCompraFinalizada.classList.add("disabled");

    contenedorCarritoProductos.innerHTML = "";

    productosEnCarrito.forEach((producto) => {
      const div = document.createElement("div");
      div.classList.add("carrito-producto");
      div.innerHTML = `
            <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.nombre}" />

            <div class="carrito-producto-titulo">
              <small>Producto:</small>
              <h3>${producto.nombre}</h3>
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

            <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash3"></i></button>
    `;

      contenedorCarritoProductos.append(div);
    });
  } else {
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.remove("disabled");
    contenedorCarritoAcciones.classList.remove("disabled");
    contenedorCompraFinalizada.classList.add("disabled");
  }
  actualizarBotonesEliminar();
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
