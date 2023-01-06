let productos = [];

class Producto {
  constructor(id, nombre, imagen, categoria, precio) {
    this.id = id;
    this.nombre = nombre;
    this.imagen = imagen;
    this.categoria = categoria;
    this.precio = precio;
  }

  agregarCatalogo() {
    productos.push(this);
  }
}

const producto1 = new Producto("mojave", "Mojave 5.0 R29", "./img/BIN-5.0-29-ROJA.jpg", "MTB", 80000);
const producto2 = new Producto("strada", "Strada 1.0 ", "./img/strada1.0-negra-sm.jpg", "Ruta", 200000);
const producto3 = new Producto("urban", "Urban 1.0", "./img/BIN-URBAN-1.1-GRIS.jpg", "Urbana", 100000);
const producto4 = new Producto("mxr", "Mx Kids", "./img/Scout-Roja-1.jpg", "Kids", 60000);
const producto5 = new Producto("atc","ATC", "/img/ATC_1_Zoom-2020.jpg","Kids", 65000);
const producto6 = new Producto("cimaurb", "Cima Urbana", "./img/Cima_URB_1_Zoom-2021.jpg", "Urbana", 110000);
const producto7 = new Producto("cimaurbdama", "Cima Urbana dama", "./img/Cima_URW_1_Zoom-2021.jpg", "Urbana", 110000);
const producto8 = new Producto("andeselite", "Andes Elite", "./img/Andes_ELT_1_Zoom-2021.jpg", "MTB", 100000);




producto1.agregarCatalogo();
producto2.agregarCatalogo();
producto3.agregarCatalogo();
producto4.agregarCatalogo();
producto5.agregarCatalogo();
producto6.agregarCatalogo();
producto7.agregarCatalogo();
producto8.agregarCatalogo();









const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesMenu = document.querySelectorAll(".boton-menu");
const tituloCategoria = document.getElementById("titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const contadorCarrito = document.getElementById("contador-carrito");

function cargarProductos(productosElegidos) {
  contenedorProductos.innerHTML = "";
  productosElegidos.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `<img class="producto-imagen" src="${producto.imagen}" alt="${producto.nombre}" />
          <div id="producto-detalle">
            <h3 class="producto-titulo">${producto.nombre}</h3>
            <p class="producto-precio">$${producto.precio}</p>
            <button class="producto-agregar" id="${producto.id}">Agregar</button>
          </div>`;

    contenedorProductos.append(div);
  });
  actualizarBotonesAgregar();
}

cargarProductos(productos);

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
