const inputBuscar = document.getElementById("inputBuscar");
const botonBuscar = document.getElementById("botonBuscar");

botonBuscar.addEventListener("click", function () {
    const texto = inputBuscar.value;

    window.location.href = "navegacion/productos.html?q=" + encodeURIComponent(texto);
});