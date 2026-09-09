const gridPopulares = document.getElementById("grid-populares");
const gridNovedades = document.getElementById("grid-novedades");
const gridUltimos = document.getElementById("grid-ultimos");

function renderizarProductos(lista, contenedor){
    contenedor.innerHTML = "";

    lista.forEach((producto) => {
        const tarjeta = document.createElement("div");
        tarjeta.className = "product-card";
        tarjeta.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}"/>
            <h3>${producto.nombre}</h3>
            <p class="price">S/ ${producto.precio.toLocaleString("es-PE")}</p>
            <button class="add-cart" data-id="${producto.id}">Agregar al carrito</button>
        `;
        contenedor.appendChild(tarjeta);
    });
}

const populares = productos.slice(0, 6);
const novedades = productos.slice(6, 12);
const ultimos = productos.slice(12, 18);

renderizarProductos(populares, gridPopulares);
renderizarProductos(novedades, gridNovedades);
renderizarProductos(ultimos, gridUltimos);
