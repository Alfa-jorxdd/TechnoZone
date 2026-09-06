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
  { id: 7,  nombre: "Laptop Ultra Slim",        precio: 2799, categoria: "laptops",      imagen: "../images/laptop.jpg" },
  { id: 8,  nombre: "Mouse Gamer RGB",          precio: 120,  categoria: "perifericos",  imagen: "../images/mouse.jpg" },
  { id: 9,  nombre: "Teclado Mecánico RGB",     precio: 249,  categoria: "perifericos",  imagen: "../images/teclado.jpg" },
  { id: 10, nombre: "Monitor 24 Pulgadas",      precio: 650,  categoria: "componentes",  imagen: "../images/laptop-gamer_01.jpg" },
  { id: 11, nombre: "Webcam HD",                precio: 99,   categoria: "perifericos",  imagen: "../images/mouse-gamer_01.jpg" },
  { id: 12, nombre: "Parlante Bluetooth",       precio: 140,  categoria: "audio",        imagen: "../images/auriculares_01.jpg" },
];
