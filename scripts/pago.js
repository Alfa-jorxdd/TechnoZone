// ------------------------------------------------------------
// ELEMENTOS DEL RESUMEN DE COMPRA
// ------------------------------------------------------------

const tablaProductos =
    document.getElementById("tabla-productos");

const resumenVacio =
    document.getElementById("resumen-vacio");

const subtotalCompra =
    document.getElementById("subtotal-compra");

const descuentoCompra =
    document.getElementById("descuento-compra");

const envioCompra =
    document.getElementById("envio-compra");

const totalCompra =
    document.getElementById("total-compra");


// ------------------------------------------------------------
// ELEMENTOS DEL FORMULARIO
// ------------------------------------------------------------

const formPago =
    document.getElementById("form-pago");

const tipoEntrega =
    document.getElementById("tipo-entrega");

const datosRecojo =
    document.getElementById("datos-recojo");

const datosDomicilio =
    document.getElementById("datos-domicilio");

const metodoPago =
    document.getElementById("metodo-pago");

const pagoTarjeta =
    document.getElementById("pago-tarjeta");

const pagoYape =
    document.getElementById("pago-yape");

const pagoPlin =
    document.getElementById("pago-plin");

const pagoTransferencia =
    document.getElementById("pago-transferencia");

const pagoContraEntrega =
    document.getElementById("pago-contra-entrega");


// ------------------------------------------------------------
// DESCUENTO
// ------------------------------------------------------------

const codigoDescuento =
    document.getElementById("codigo-descuento");

const botonDescuento =
    document.getElementById("btn-descuento");

const mensajeDescuento =
    document.getElementById("mensaje-descuento");

let descuentoActivo = false;


// ------------------------------------------------------------
// MOSTRAR PRODUCTOS EN LA TABLA DINÁMICA
// ------------------------------------------------------------

function mostrarResumenCompra() {

    const carrito = obtenerCarrito();

    tablaProductos.innerHTML = "";

    if (carrito.length === 0) {

        resumenVacio.hidden = false;

        actualizarTotales();

        return;
    }

    resumenVacio.hidden = true;


    carrito.forEach((item) => {

        const producto = productos.find(
            (p) => Number(p.id) === Number(item.id)
        );

        if (!producto) {
            return;
        }


        const subtotal =
            producto.precio * item.cantidad;


        const fila =
            document.createElement("tr");


        fila.innerHTML = `

      <td>
        <div class="producto-tabla">

          <img
            src="${producto.imagen}"
            alt="${producto.nombre}"
          />

          <h3>
            ${producto.nombre}
          </h3>

        </div>
      </td>


      <td class="precio-tabla">

        S/
        ${producto.precio.toLocaleString("es-PE")}

      </td>


      <td>

        <div class="cantidad-tabla">

          <button
            type="button"
            class="btn-tabla-cantidad"
            data-accion="restar"
            data-id="${producto.id}"
          >
            −
          </button>


          <span>
            ${item.cantidad}
          </span>


          <button
            type="button"
            class="btn-tabla-cantidad"
            data-accion="sumar"
            data-id="${producto.id}"
          >
            +
          </button>

        </div>

      </td>


      <td class="subtotal-tabla">

        S/
        ${subtotal.toLocaleString("es-PE")}

      </td>


      <td>

        <button
          type="button"
          class="btn-tabla-eliminar"
          data-id="${producto.id}"
        >
          Eliminar
        </button>

      </td>

    `;


        tablaProductos.appendChild(fila);

    });


    actualizarTotales();
}


// ------------------------------------------------------------
// CALCULAR TOTALES
// ------------------------------------------------------------

function actualizarTotales() {

    const carrito = obtenerCarrito();

    const subtotal =
        calcularTotal(carrito);


    let descuento = 0;

    if (descuentoActivo) {

        descuento =
            subtotal * 0.10;

    }


    let envio = 0;

    if (tipoEntrega.value === "domicilio") {

        envio = 15;

    }


    const total =
        subtotal - descuento + envio;


    subtotalCompra.textContent =
        "S/ " +
        subtotal.toLocaleString("es-PE");


    descuentoCompra.textContent =
        "S/ " +
        descuento.toLocaleString(
            "es-PE",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );


    envioCompra.textContent =
        "S/ " +
        envio.toLocaleString("es-PE");


    totalCompra.textContent =
        "S/ " +
        total.toLocaleString(
            "es-PE",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );
}


// ------------------------------------------------------------
// SUMAR, RESTAR Y ELIMINAR PRODUCTOS
// ------------------------------------------------------------

tablaProductos.addEventListener(
    "click",
    function (evento) {

        const boton = evento.target;


        if (
            boton.classList.contains(
                "btn-tabla-cantidad"
            )
        ) {

            const id =
                Number(boton.dataset.id);

            const accion =
                boton.dataset.accion;


            if (accion === "sumar") {

                cambiarCantidad(id, 1);

            }


            if (accion === "restar") {

                cambiarCantidad(id, -1);

            }


            mostrarResumenCompra();

        }


        if (
            boton.classList.contains(
                "btn-tabla-eliminar"
            )
        ) {

            const id =
                Number(boton.dataset.id);


            quitarDelCarrito(id);


            mostrarResumenCompra();

        }

    }
);


// ------------------------------------------------------------
// TIPO DE ENTREGA
// ------------------------------------------------------------

tipoEntrega.addEventListener(
    "change",
    function () {

        datosRecojo.hidden = true;

        datosDomicilio.hidden = true;


        if (
            tipoEntrega.value === "recojo"
        ) {

            datosRecojo.hidden = false;

        }


        if (
            tipoEntrega.value === "domicilio"
        ) {

            datosDomicilio.hidden = false;

        }


        actualizarTotales();

    }
);


// ------------------------------------------------------------
// MÉTODO DE PAGO
// ------------------------------------------------------------

metodoPago.addEventListener(
    "change",
    function () {

        pagoTarjeta.hidden = true;

        pagoYape.hidden = true;

        pagoPlin.hidden = true;

        pagoTransferencia.hidden = true;

        pagoContraEntrega.hidden = true;


        if (
            metodoPago.value === "tarjeta"
        ) {

            pagoTarjeta.hidden = false;

        }


        if (
            metodoPago.value === "yape"
        ) {

            pagoYape.hidden = false;

        }


        if (
            metodoPago.value === "plin"
        ) {

            pagoPlin.hidden = false;

        }


        if (
            metodoPago.value === "transferencia"
        ) {

            pagoTransferencia.hidden = false;

        }


        if (
            metodoPago.value === "contra-entrega"
        ) {

            pagoContraEntrega.hidden = false;

        }

    }
);


// ------------------------------------------------------------
// CÓDIGO DE DESCUENTO
// ------------------------------------------------------------

botonDescuento.addEventListener(
    "click",
    function () {

        const codigo =
            codigoDescuento.value
                .trim()
                .toUpperCase();


        if (codigo === "") {

            mensajeDescuento.textContent =
                "Ingrese un código de descuento.";

            mensajeDescuento.style.color =
                "#e63946";

            descuentoActivo = false;

            actualizarTotales();

            return;
        }


        if (codigo === "TECH10") {

            descuentoActivo = true;

            mensajeDescuento.textContent =
                "Código aplicado: 10% de descuento.";

            mensajeDescuento.style.color =
                "#1a277e";

        } else {

            descuentoActivo = false;

            mensajeDescuento.textContent =
                "El código ingresado no es válido.";

            mensajeDescuento.style.color =
                "#e63946";

        }


        actualizarTotales();

    }
);


// ------------------------------------------------------------
// BUSCADOR DEL ENCABEZADO
// ------------------------------------------------------------

const inputBuscar =
    document.getElementById("inputBuscar");

const botonBuscar =
    document.getElementById("botonBuscar");


botonBuscar.addEventListener(
    "click",
    function () {

        const texto =
            inputBuscar.value;

        window.location.href =
            "productos.html?q=" +
            encodeURIComponent(texto);

    }
);


// ------------------------------------------------------------
// VALIDAR Y CONFIRMAR COMPRA
// ------------------------------------------------------------

formPago.addEventListener(
    "submit",
    function (evento) {

        evento.preventDefault();


        const carrito =
            obtenerCarrito();


        if (carrito.length === 0) {

            alert(
                "Tu carrito está vacío."
            );

            return;
        }


        const nombre =
            document
                .getElementById("nombre-completo")
                .value
                .trim();


        const tipoDocumento =
            document
                .getElementById("tipo-documento")
                .value;


        const numeroDocumento =
            document
                .getElementById("numero-documento")
                .value
                .trim();


        const correo =
            document
                .getElementById("correo")
                .value
                .trim();


        const telefono =
            document
                .getElementById("telefono")
                .value
                .trim();


        if (nombre === "") {

            alert(
                "Ingrese su nombre completo."
            );

            return;
        }


        if (tipoDocumento === "") {

            alert(
                "Seleccione un tipo de documento."
            );

            return;
        }


        if (numeroDocumento === "") {

            alert(
                "Ingrese su número de documento."
            );

            return;
        }


        if (correo === "") {

            alert(
                "Ingrese su correo electrónico."
            );

            return;
        }


        if (telefono === "") {

            alert(
                "Ingrese su teléfono."
            );

            return;
        }


        if (tipoEntrega.value === "") {

            alert(
                "Seleccione un tipo de entrega."
            );

            return;
        }


        // VALIDACIÓN PARA ENVÍO A DOMICILIO

        if (
            tipoEntrega.value === "domicilio"
        ) {

            const direccion =
                document
                    .getElementById("direccion")
                    .value
                    .trim();


            const distrito =
                document
                    .getElementById("distrito")
                    .value;


            if (direccion === "") {

                alert(
                    "Ingrese la dirección de entrega."
                );

                return;
            }


            if (distrito === "") {

                alert(
                    "Seleccione un distrito."
                );

                return;
            }

        }


        if (metodoPago.value === "") {

            alert(
                "Seleccione un método de pago."
            );

            return;
        }


        // VALIDACIÓN PARA TARJETA

        if (
            metodoPago.value === "tarjeta"
        ) {

            const numeroTarjeta =
                document
                    .getElementById("numero-tarjeta")
                    .value
                    .trim();


            const titular =
                document
                    .getElementById("titular-tarjeta")
                    .value
                    .trim();


            const fecha =
                document
                    .getElementById("fecha-vencimiento")
                    .value;


            const cvv =
                document
                    .getElementById("cvv")
                    .value
                    .trim();


            if (
                numeroTarjeta === "" ||
                titular === "" ||
                fecha === "" ||
                cvv === ""
            ) {

                alert(
                    "Complete todos los datos de la tarjeta."
                );

                return;
            }

        }


        // VALIDACIÓN PARA TRANSFERENCIA

        if (
            metodoPago.value === "transferencia"
        ) {

            const banco =
                document
                    .getElementById("banco")
                    .value;


            if (banco === "") {

                alert(
                    "Seleccione un banco."
                );

                return;
            }

        }


        const terminos =
            document
                .getElementById("aceptar-terminos");


        if (!terminos.checked) {

            alert(
                "Debe aceptar los términos y condiciones."
            );

            return;
        }


        // TODO ESTÁ CORRECTO:
        // PASAMOS A LA PÁGINA QUE YA EXISTE

        window.location.href =
            "confirmacion.html";

    }
);


// ------------------------------------------------------------
// MOSTRAR LOS PRODUCTOS AL CARGAR
// ------------------------------------------------------------

mostrarResumenCompra();