let productos = [];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesMenu = document.querySelectorAll(".boton-menu");
const tituloCategoria = document.getElementById("titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const contadorCarrito = document.getElementById("contador-carrito");

fetch("./productos.json")
  .then((response) => response.json())
  .then((data) => cargarProductos(data))
  

async function cargarProductos(productosElegidos) {
  const listaProductos = await fetch("./productos.json");
  productos = await listaProductos.json();
  contenedorProductos.innerHTML = "";
  productosElegidos.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `<img class="producto-imagen" src="${producto.imagen}" alt="${producto.nombre}" />
          <div id="producto-detalle">
            <h3 class="producto-marca">${producto.marca}</h3>
            <h3 class="producto-titulo">${producto.nombre}</h3>
            <p class="producto-precio">$${producto.precio}</p>
            <button class="producto-agregar btn btn-dark" id="${producto.id}">Agregar</button>
          </div>`;

    contenedorProductos.append(div);
  });
  actualizarBotonesAgregar();
}

botonesMenu.forEach((boton) => {
  boton.addEventListener("click", (e) => {
    botonesMenu.forEach((boton) => boton.classList.remove("active"));
    e.currentTarget.classList.add("active");

    if (e.currentTarget.id != "todos") {
      const categoriaProducto = productos.find((producto) => producto.categoria === e.currentTarget.id);
      tituloCategoria.innerText = categoriaProducto.categoria;

      const productosFiltrados = productos.filter((producto) => producto.categoria === e.currentTarget.id);
      cargarProductos(productosFiltrados);
    } else {
      tituloCategoria.innerText = "Todos los productos";
      cargarProductos(productos);
    }
  });
});

function actualizarBotonesAgregar() {
  botonesAgregar = document.querySelectorAll(".producto-agregar");

  botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", agregarAlCarrito);
  });
}

const productosEnCarritoLocalStorage = JSON.parse(localStorage.getItem("productos-en-carrito"));
let productosEnCarrito = [];

if (productosEnCarritoLocalStorage) {
  productosEnCarrito = productosEnCarritoLocalStorage;
  actualizarContadorCarrito();
}

function agregarAlCarrito(e) {
  const idBoton = e.currentTarget.id;
  const productoAgregado = productos.find((producto) => producto.id === idBoton);

  if (productosEnCarrito.some((producto) => producto.id === idBoton)) {
    const index = productosEnCarrito.findIndex((producto) => producto.id === idBoton);
    productosEnCarrito[index].cantidad++;
  } else {
    productoAgregado.cantidad = 1;
    productosEnCarrito.push(productoAgregado);
  }

  actualizarContadorCarrito();
  localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarContadorCarrito() {
  let nuevoContadorCarrito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
  contadorCarrito.innerHTML = nuevoContadorCarrito;
}

console.log()

