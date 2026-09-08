// data.js
// Aquí vive TODA la información de los productos, en un solo lugar.
// Cada producto es un objeto con los mismos campos (id, nombre, precio, categoria, imagen).
// Tanto la página de catálogo como, más adelante, la de detalle de producto,
// van a leer de este mismo array — así evitamos escribir el HTML de cada tarjeta a mano.

const productos = [
  { id: 1,  nombre: "Laptop Gamer XYZ",        precio: 3499, categoria: "laptops",      imagen: "../images/laptop-gamer_01.jpg" },
  { id: 2,  nombre: "Mouse Inalámbrico",       precio: 89,   categoria: "perifericos",  imagen: "../images/mouse-gamer_01.jpg" },
  { id: 3,  nombre: "Teclado Mecánico",        precio: 199,  categoria: "perifericos",  imagen: "../images/teclado-gamer_01.jpg" },
  { id: 4,  nombre: "Gabinete Con Ventilación", precio: 400,  categoria: "componentes",  imagen: "../images/gabinete-gamer_01.jpg" },
  { id: 5,  nombre: "Auriculares Inalámbricos", precio: 56,   categoria: "audio",        imagen: "../images/auriculares_01.jpg" },
  { id: 6,  nombre: "Micrófono Profesional",    precio: 230,  categoria: "audio",        imagen: "../images/microfono_01.jpg" },
  { id: 7,  nombre: "Monitor Gamer Curvo",        precio: 120, categoria: "perifericos",      imagen: "../images/monitor-gamer_01.jpg" },
  { id: 8,  nombre: "Tarjeta Gráfica de Última Generación",          precio: 2900,  categoria: "componente",  imagen: "../images/tarjeta-grafica_01.jpg" },
  { id: 9,  nombre: "Memoria RAM RGB",     precio: 249,  categoria: "componente",  imagen: "../images/memoria-ram_01.jpg" },
  { id: 10, nombre: "Silla Ergonómica Premium",      precio: 110,  categoria: "mobiliario",  imagen: "../images/silla-ergonomica-premium_01.jpg" }, //AGREGA MOBILIARIO AL FILTRO DE CATEGORIA ANGHELO AAAAAAAA
  { id: 11, nombre: "Cámara Web 4K / Ultra HD",                precio: 99,   categoria: "perifericos",  imagen: "../images/camara-web_01.jpg" },
  { id: 12, nombre: "Estación de Carga Multiport",       precio: 40,  categoria: "perifericos",        imagen: "../images/estacion-carga-multiport_01.jpg" },
  { id: 13, nombre: "Mouse Pad",       precio: 35,  categoria: "perifericos",        imagen: "../images/mousepad_01.jpg" },
  { id: 14, nombre: "Barra de Luz LED",       precio: 56,  categoria: "perifericos",        imagen: "../images/barra-led_01.jpg" },
  { id: 15, nombre: "Cargador Inalámbrico",       precio: 80,  categoria: "accesorios",        imagen: "../images/cargador-inalambrico_01.jpg" },
  { id: 16, nombre: "Disco Duro Sólido",       precio: 150,  categoria: "componentes",        imagen: "../images/disco-duro_01.jpg" },
  { id: 17, nombre: "Procesador de Última Generación",       precio: 500,  categoria: "componentes",        imagen: "../images/cpu_01.jpg" },
  { id: 18, nombre: "Fuente de Poder Certificada (850W Gold)",       precio: 230,  categoria: "componentes",        imagen: "../images/fuente-de-poder_01.jpg" },
];
