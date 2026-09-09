// carrito.js
// Maneja todo lo relacionado al carrito:
// guardar, leer, mostrar y modificar los productos.

const CLAVE_CARRITO = "technozone_carrito";


// ------------------------------------------------------------------
// 1. LEER Y GUARDAR EL CARRITO
// ------------------------------------------------------------------

function obtenerCarrito() {

  const data = localStorage.getItem(CLAVE_CARRITO);

  return data ? JSON.parse(data) : [];
}


function guardarCarrito(carrito) {

  localStorage.setItem(
      CLAVE_CARRITO,
      JSON.stringify(carrito)
  );
}


// ------------------------------------------------------------------
// 2. OPERACIONES DEL CARRITO
// ------------------------------------------------------------------

function agregarAlCarrito(id) {

  const carrito = obtenerCarrito();

  const itemExistente = carrito.find(
      (item) => Number(item.id) === Number(id)
  );

  if (itemExistente) {

    itemExistente.cantidad += 1;

  } else {

    carrito.push({
      id: Number(id),
      cantidad: 1
    });

  }

  guardarCarrito(carrito);

  renderizarCarrito();
}


function cambiarCantidad(id, delta) {

  const carrito = obtenerCarrito();

  const item = carrito.find(
      (item) => Number(item.id) === Number(id)
  );

  if (!item) {
    return;
  }

  item.cantidad += delta;

  if (item.cantidad <= 0) {

    const nuevoCarrito = carrito.filter(
        (i) => Number(i.id) !== Number(id)
    );

    guardarCarrito(nuevoCarrito);

  } else {

    guardarCarrito(carrito);

  }

  renderizarCarrito();
}


function quitarDelCarrito(id) {

  const carrito = obtenerCarrito().filter(
      (item) => Number(item.id) !== Number(id)
  );

  guardarCarrito(carrito);

  renderizarCarrito();
}


function calcularTotal(carrito) {

  return carrito.reduce((total, item) => {

    const producto = productos.find(
        (p) => Number(p.id) === Number(item.id)
    );

    if (!producto) {
      return total;
    }

    return total + producto.precio * item.cantidad;

  }, 0);
}


// ------------------------------------------------------------------
// 3. MOSTRAR CARRITO
// ------------------------------------------------------------------

function renderizarCarrito() {

  const carrito = obtenerCarrito();

  const contenedor =
      document.getElementById("carrito-items");

  const mensajeVacio =
      document.getElementById("carrito-vacio");

  const totalTexto =
      document.getElementById("carrito-total");

  const badge =
      document.getElementById("carrito-contador");


  const totalUnidades = carrito.reduce(
      (suma, item) => suma + item.cantidad,
      0
  );


  badge.textContent = totalUnidades;

  badge.hidden = totalUnidades === 0;


  contenedor.innerHTML = "";


  if (carrito.length === 0) {

    mensajeVacio.hidden = false;

    totalTexto.textContent = "S/ 0";

    return;
  }


  mensajeVacio.hidden = true;


  carrito.forEach((item) => {

    const producto = productos.find(
        (p) => Number(p.id) === Number(item.id)
    );

    if (!producto) {
      return;
    }


    const fila = document.createElement("div");

    fila.className = "carrito-item";


    fila.innerHTML = `

      <img
        src="${producto.imagen}"
        alt="${producto.nombre}"
      />

      <div class="carrito-item-info">

        <h4>${producto.nombre}</h4>

        <p class="carrito-item-precio">
          S/ ${producto.precio.toLocaleString("es-PE")}
        </p>

        <div class="carrito-item-cantidad">

          <button
            class="btn-cantidad"
            data-accion="restar"
            data-id="${producto.id}"
          >
            −
          </button>

          <span>
            ${item.cantidad}
          </span>

          <button
            class="btn-cantidad"
            data-accion="sumar"
            data-id="${producto.id}"
          >
            +
          </button>

        </div>

      </div>

      <button
        class="carrito-item-quitar"
        data-accion="quitar"
        data-id="${producto.id}"
        aria-label="Quitar producto"
      >
        &times;
      </button>

    `;


    contenedor.appendChild(fila);
  });


  const total = calcularTotal(carrito);


  totalTexto.textContent =
      "S/ " + total.toLocaleString("es-PE");
}


// ------------------------------------------------------------------
// 4. ABRIR Y CERRAR CARRITO
// ------------------------------------------------------------------

function abrirCarrito() {

  document
      .getElementById("carrito-panel")
      .classList.add("abierto");

  document
      .getElementById("carrito-overlay")
      .classList.add("visible");
}


function cerrarCarrito() {

  document
      .getElementById("carrito-panel")
      .classList.remove("abierto");

  document
      .getElementById("carrito-overlay")
      .classList.remove("visible");
}


// ------------------------------------------------------------------
// 5. EVENTOS
// ------------------------------------------------------------------

document
    .getElementById("btn-carrito")
    .addEventListener(
        "click",
        abrirCarrito
    );


document
    .getElementById("btn-cerrar-carrito")
    .addEventListener(
        "click",
        cerrarCarrito
    );


document
    .getElementById("carrito-overlay")
    .addEventListener(
        "click",
        cerrarCarrito
    );


// Botones agregar, sumar, restar y quitar.

document.body.addEventListener("click", function (evento) {

  const boton = evento.target;


  if (boton.matches(".add-cart")) {

    const id = Number(boton.dataset.id);

    if (!isNaN(id)) {

      agregarAlCarrito(id);

    }

    return;
  }


  if (
      boton.matches(".btn-cantidad") ||
      boton.matches(".carrito-item-quitar")
  ) {

    const id = Number(boton.dataset.id);

    const accion =
        boton.dataset.accion;


    if (accion === "sumar") {

      cambiarCantidad(id, 1);

    }


    if (accion === "restar") {

      cambiarCantidad(id, -1);

    }


    if (accion === "quitar") {

      quitarDelCarrito(id);

    }

  }

});


// ------------------------------------------------------------------
// 6. PROCEDER AL PAGO
// ------------------------------------------------------------------

document
    .getElementById("btn-checkout")
    .addEventListener("click", function () {

      const carrito = obtenerCarrito();

      if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
      }

      if (
          window.location.pathname.includes("/navegacion/")
      ) {
        window.location.href = "pago.html";
      } else {
        window.location.href = "navegacion/pago.html";
      }

    });


// ------------------------------------------------------------------
// 7. MOSTRAR CARRITO AL CARGAR LA PÁGINA
// ------------------------------------------------------------------

renderizarCarrito();