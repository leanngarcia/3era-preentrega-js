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
producto1.agregarCatalogo();

const producto2 = new Producto("strada", "Strada 1.0 ", "./img/strada1.0-negra-sm.jpg", "Ruta", 200000);
producto2.agregarCatalogo();

const producto3 = new Producto("urban", "Urban 1.0", "./img/BIN-URBAN-1.1-GRIS.jpg", "Urbana", 100000);
producto3.agregarCatalogo();

const producto4 = new Producto("mxr", "Mx Kids", "./img/Scout-Roja-1.jpg", "Kids", 60000);
producto4.agregarCatalogo();

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesMenu = document.querySelectorAll(".boton-menu");
const tituloCategoria = document.getElementById("titulo-principal");

function cargarProductos(productosElegidos) {
  contenedorProductos.innerHTML = "";
  productosElegidos.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `<img class="producto-imagen" src="${producto.imagen}" alt="${producto.nombre}" />
          <div>
            <h3 class="producto-titulo">${producto.nombre}</h3>
            <p class="producto-precio">$${producto.precio}</p>
            <button class="producto-agregar" id="${producto.id}">Agregar</button>
          </div>`;

    contenedorProductos.append(div);
  });
}

cargarProductos(productos);

botonesMenu.forEach((boton) => {
  boton.addEventListener("click", (e) => {
    botonesMenu.forEach((boton) => boton.classList.remove("active"));
    e.currentTarget.classList.add("active");

    if (e.currentTarget.id != "todos") {
      const categoriaProducto = productos.find((producto) => producto.categoria === e.currentTarget.id);
      tituloCategoria.innerText = categoriaProducto.categoria;

      console.log(categoriaProducto);
      console.log(tituloCategoria);

      const productosFiltrados = productos.filter((producto) => producto.categoria === e.currentTarget.id);
      cargarProductos(productosFiltrados);
    } else {
      tituloCategoria.innerText = "Todos los productos";
      cargarProductos(productos);
    }
  });
});
