/* detalle-producto.js — Carga dinámica del detalle y selector de cantidad */

// Leer el parámetro "?prod=" de la URL
var urlParams = new URLSearchParams(window.location.search);
var productoID = urlParams.get('prod');

// Producto a mostrar (por defecto rosquillas)
var prodActual = (productoID && bdProductos[productoID])
    ? bdProductos[productoID]
    : bdProductos['rosquillas'];

// Rellenar la info del producto
document.getElementById('det-img').src = prodActual.img;
document.getElementById('det-titulo').textContent = prodActual.titulo;
document.getElementById('det-precio').textContent = 'C$ ' + prodActual.precio.toFixed(2) + ' / ' + prodActual.unidad;
document.getElementById('det-desc').textContent = prodActual.desc;

// Cantidad
var cantidadActual = 1;
var spanCantidad = document.getElementById('det-cantidad');

document.getElementById('btn-menos').addEventListener('click', function () {
    if (cantidadActual > 1) {
        cantidadActual--;
        spanCantidad.textContent = cantidadActual;
    }
});

document.getElementById('btn-mas').addEventListener('click', function () {
    cantidadActual++;
    spanCantidad.textContent = cantidadActual;
});

// Agregar al carrito
document.getElementById('btn-agregar-carrito').addEventListener('click', function (e) {
    e.preventDefault();
    agregarAlCarrito(prodActual.id, cantidadActual);

    // Feedback visual
    var btnText = this.querySelector('.btn-texto');
    var originalText = btnText.textContent;
    btnText.textContent = '¡Agregado!';
    this.style.background = '#28a745';

    var self = this;
    setTimeout(function () {
        btnText.textContent = originalText;
        self.style.background = '';
    }, 1200);
});
