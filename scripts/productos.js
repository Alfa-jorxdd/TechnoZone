
const inputBusqueda   = document.getElementById("buscador");
const selectCategoria = document.getElementById("filtro-categoria");
const inputPrecioMin  = document.getElementById("precio-min");
const inputPrecioMax  = document.getElementById("precio-max");
const selectOrden     = document.getElementById("orden");
const contenedorGrid  = document.getElementById("grid-productos");
const mensajeVacio    = document.getElementById("sin-resultados");
const contadorTexto   = document.getElementById("contador-resultados");

function renderizarProductos(lista) {
  contenedorGrid.innerHTML = "";

  if (lista.length === 0) {
    mensajeVacio.hidden = false;
    contadorTexto.textContent = "0 productos encontrados";
    return;
  }
  mensajeVacio.hidden = true;
  contadorTexto.textContent = `${lista.length} producto${lista.length === 1 ? "" : "s"} encontrado${lista.length === 1 ? "" : "s"}`;

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

function aplicarFiltros() {
  const texto      = inputBusqueda.value.trim().toLowerCase();
  const categoria  = selectCategoria.value;     
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

inputBusqueda.addEventListener("input", aplicarFiltros);
inputPrecioMin.addEventListener("input", aplicarFiltros);
inputPrecioMax.addEventListener("input", aplicarFiltros);

selectCategoria.addEventListener("change", aplicarFiltros);
selectOrden.addEventListener("change", aplicarFiltros);

const param = new URLSearchParams(window.location.search);
const textoRecibido = param.get("q");

if(textoRecibido){
  inputBusqueda.value = textoRecibido;
}

aplicarFiltros();