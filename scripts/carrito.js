// carrito.js
// Maneja TODO lo relacionado al carrito: guardarlo, leerlo, dibujarlo y reaccionar
// a los clics del usuario. Se carga en TODAS las páginas del sitio (home, productos, etc.)
// para que el carrito esté disponible sin importar en qué página esté el usuario.
//
// Requiere que data.js se cargue ANTES (usamos la variable "productos" para
// saber el nombre/precio/imagen de cada id que hay en el carrito).

// La "llave" bajo la cual guardamos el carrito en localStorage.
// Es como el nombre de una tabla en una base de datos: todo el carrito vive ahí.
const CLAVE_CARRITO = "technozone_carrito";

// ------------------------------------------------------------------
// 1. LEER Y ESCRIBIR EN localStorage
// ------------------------------------------------------------------
// localStorage solo guarda texto (strings), por eso "serializamos" el array
// a JSON antes de guardarlo, y lo "deserializamos" (JSON.parse) al leerlo.
// Es el mismo concepto que serializar un objeto a JSON en Java con Jackson/Gson.

function obtenerCarrito() {
  const data = localStorage.getItem(CLAVE_CARRITO);
  // Si nunca se guardó nada, data es null -> devolvemos un array vacío.
  return data ? JSON.parse(data) : [];
}

function guardarCarrito(carrito) {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

// El carrito es un array simple de objetos: [{ id: 1, cantidad: 2 }, { id: 5, cantidad: 1 }]
// OJO: no guardamos nombre/precio/imagen aquí, solo el id y la cantidad.
// Esos otros datos los buscamos en el array "productos" de data.js cuando los necesitamos.
// Es el mismo principio que guardar solo una foreign key en vez de duplicar toda la fila.

// ------------------------------------------------------------------
// 2. OPERACIONES SOBRE EL CARRITO
// ------------------------------------------------------------------

function agregarAlCarrito(id) {
  const carrito = obtenerCarrito();

  // .find() es como un for-each buscando el primer elemento que cumpla la condición
  // (equivalente a Stream.filter().findFirst() en Java)
  const itemExistente = carrito.find((item) => item.id === id);

  if (itemExistente) {
    itemExistente.cantidad += 1;
  } else {
    carrito.push({ id: id, cantidad: 1 });
  }

  guardarCarrito(carrito);
  renderizarCarrito();
}

function cambiarCantidad(id, delta) {
  const carrito = obtenerCarrito();
  const item = carrito.find((item) => item.id === id);
  if (!item) return;

  item.cantidad += delta;

  if (item.cantidad <= 0) {
    // Si la cantidad llega a 0, quitamos el producto por completo.
    // .filter() reconstruye el array sin el elemento que no cumple la condición.
    guardarCarrito(carrito.filter((i) => i.id !== id));
  } else {
    guardarCarrito(carrito);
  }

  renderizarCarrito();
}

function quitarDelCarrito(id) {
  const carrito = obtenerCarrito().filter((item) => item.id !== id);
  guardarCarrito(carrito);
  renderizarCarrito();
}

function calcularTotal(carrito) {
  // .reduce() acumula un solo valor recorriendo el array.
  // Es el equivalente a Stream.reduce() en Java: (acumulador, elementoActual) -> nuevoAcumulador
  return carrito.reduce((total, item) => {
    const producto = productos.find((p) => p.id === item.id);
    if (!producto) return total; // por si el producto ya no existe en el catálogo
    return total + producto.precio * item.cantidad;
  }, 0);
}

// ------------------------------------------------------------------
// 3. DIBUJAR EL PANEL (todo lo visual vive en esta función)
// ------------------------------------------------------------------

function renderizarCarrito() {
  const carrito = obtenerCarrito();
  const contenedor = document.getElementById("carrito-items");
  const mensajeVacio = document.getElementById("carrito-vacio");
  const totalTexto = document.getElementById("carrito-total");
  const badge = document.getElementById("carrito-contador");

  // El "badge" (numerito rojo) sobre el ícono del carrito, en el header.
  const totalUnidades = carrito.reduce((suma, item) => suma + item.cantidad, 0);
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
    const producto = productos.find((p) => p.id === item.id);
    if (!producto) return;

    const fila = document.createElement("div");
    fila.className = "carrito-item";
    fila.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" />
      <div class="carrito-item-info">
        <h4>${producto.nombre}</h4>
        <p class="carrito-item-precio">S/ ${producto.precio.toLocaleString("es-PE")}</p>
        <div class="carrito-item-cantidad">
          <button class="btn-cantidad" data-accion="restar" data-id="${producto.id}">−</button>
          <span>${item.cantidad}</span>
          <button class="btn-cantidad" data-accion="sumar" data-id="${producto.id}">+</button>
        </div>
      </div>
      <button class="carrito-item-quitar" data-accion="quitar" data-id="${producto.id}" aria-label="Quitar producto">&times;</button>
    `;
    contenedor.appendChild(fila);
  });

  totalTexto.textContent = `S/ ${calcularTotal(carrito).toLocaleString("es-PE")}`;
}

// ------------------------------------------------------------------
// 4. ABRIR / CERRAR EL PANEL
// ------------------------------------------------------------------
// Simplemente agregamos o quitamos una clase CSS ("abierto"); toda la animación
// de deslizar el panel la maneja el CSS con "transition" (ver carrito.css).

function abrirCarrito() {
  document.getElementById("carrito-panel").classList.add("abierto");
  document.getElementById("carrito-overlay").classList.add("visible");
}

function cerrarCarrito() {
  document.getElementById("carrito-panel").classList.remove("abierto");
  document.getElementById("carrito-overlay").classList.remove("visible");
}

// ------------------------------------------------------------------
// 5. EVENT LISTENERS
// ------------------------------------------------------------------

document.getElementById("btn-carrito").addEventListener("click", abrirCarrito);
document.getElementById("btn-cerrar-carrito").addEventListener("click", cerrarCarrito);
document.getElementById("carrito-overlay").addEventListener("click", cerrarCarrito);

// --- Delegación de eventos: la parte más importante para que entiendas ---
//
// En vez de poner un addEventListener a CADA botón "Agregar al carrito"
// (que ni siquiera existen todos al cargar la página, porque productos.js
// los crea dinámicamente después), ponemos UN SOLO listener en el <body>.
// Cuando el usuario hace clic en cualquier parte, revisamos SI lo que clickeó
// coincide con el botón que nos interesa (.matches()). Esto funciona incluso
// con botones creados dinámicamente después de que la página cargó.
//
// Es parecido a un solo listener a nivel de un contenedor padre en vez de
// registrar un ActionListener por cada JButton individual.

document.body.addEventListener("click", (evento) => {
  const boton = evento.target;

  // Caso 1: clic en un botón "Agregar al carrito" (viene de productos.js o de home)
  if (boton.matches(".add-cart")) {
    const id = parseInt(boton.dataset.id);
    if (!isNaN(id)) agregarAlCarrito(id);
    return;
  }

  // Caso 2: clic en +, -, o quitar, DENTRO del panel del carrito
  if (boton.matches(".btn-cantidad") || boton.matches(".carrito-item-quitar")) {
    const id = parseInt(boton.dataset.id);
    const accion = boton.dataset.accion;

    if (accion === "sumar") cambiarCantidad(id, 1);
    if (accion === "restar") cambiarCantidad(id, -1);
    if (accion === "quitar") quitarDelCarrito(id);
  }
});

// ------------------------------------------------------------------
// 6. AL CARGAR CUALQUIER PÁGINA: mostrar el carrito tal como quedó guardado
// ------------------------------------------------------------------
// Esto es lo que hace que el carrito "persista" al cambiar de página:
// cada página, al cargar, vuelve a leer localStorage y dibuja el mismo estado.
renderizarCarrito();
