// productos.js
// Este archivo se encarga de TODO lo dinámico de la página de catálogo:
// dibujar las tarjetas, y reaccionar cuando el usuario busca, filtra u ordena.
//
// Requiere que data.js se cargue ANTES que este archivo en el HTML,
// porque usamos la variable "productos" que se define ahí.

// 1. Referencias a los elementos del HTML con los que vamos a interactuar.
const inputBusqueda   = document.getElementById("buscador");
const selectCategoria = document.getElementById("filtro-categoria");
const inputPrecioMin  = document.getElementById("precio-min");
const inputPrecioMax  = document.getElementById("precio-max");
const selectOrden     = document.getElementById("orden");
const contenedorGrid  = document.getElementById("grid-productos");
const mensajeVacio    = document.getElementById("sin-resultados");
const contadorTexto   = document.getElementById("contador-resultados");

// 2. Función que recibe una lista de productos YA FILTRADA y la dibuja en pantalla.
//    Esta función NO decide qué mostrar, solo sabe cómo convertir datos en HTML.
function renderizarProductos(lista) {
  // Limpiamos el contenedor antes de volver a dibujar (si no, se acumularían tarjetas viejas)
  contenedorGrid.innerHTML = "";

  // Si no hay resultados, mostramos el mensaje y no seguimos
  if (lista.length === 0) {
    mensajeVacio.hidden = false;
    contadorTexto.textContent = "0 productos encontrados";
    return;
  }
  mensajeVacio.hidden = true;
  contadorTexto.textContent = `${lista.length} producto${lista.length === 1 ? "" : "s"} encontrado${lista.length === 1 ? "" : "s"}`;

  // Por cada producto de la lista, creamos su tarjeta de HTML.
  // Usamos un "template literal" (comillas invertidas ``) para armar el HTML como texto.
  lista.forEach((producto) => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "product-card";
    tarjeta.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" />
      <h3>${producto.nombre}</h3>
      <p class="price">S/ ${producto.precio.toLocaleString("es-PE")}</p>
      <button class="add-cart" data-id="${producto.id}">Agregar al carrito</button>
    `;
    contenedorGrid.appendChild(tarjeta);
  });
}

// 3. La función principal: lee el estado actual de TODOS los filtros,
//    se los aplica al array completo de productos, y renderiza el resultado.
function aplicarFiltros() {
  const texto      = inputBusqueda.value.trim().toLowerCase();
  const categoria  = selectCategoria.value;      // "" significa "todas"
  const precioMin  = parseFloat(inputPrecioMin.value) || 0;
  const precioMax  = parseFloat(inputPrecioMax.value) || Infinity;
  const orden      = selectOrden.value;

  let resultado = productos.filter((producto) => {
    const coincideTexto     = producto.nombre.toLowerCase().includes(texto);
    const coincideCategoria = categoria === "" || producto.categoria === categoria;
    const coincidePrecio    = producto.precio >= precioMin && producto.precio <= precioMax;

    return coincideTexto && coincideCategoria && coincidePrecio;
  });

  if (orden === "precio-asc") {
    resultado.sort((a, b) => a.precio - b.precio);
  } else if (orden === "precio-desc") {
    resultado.sort((a, b) => b.precio - a.precio);
  } else if (orden === "nombre-asc") {
    resultado.sort((a, b) => a.nombre.localeCompare(b.nombre));
  }

  renderizarProductos(resultado);
}

// 4. Se aplican listener para filtrar en tiempo real si el usuario cambia cualquier filtro
inputBusqueda.addEventListener("input", aplicarFiltros);
inputPrecioMin.addEventListener("input", aplicarFiltros);
inputPrecioMax.addEventListener("input", aplicarFiltros);

selectCategoria.addEventListener("change", aplicarFiltros);
selectOrden.addEventListener("change", aplicarFiltros);

aplicarFiltros();