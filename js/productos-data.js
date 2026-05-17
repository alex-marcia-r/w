/* productos-data.js — Base de datos de productos compartida */
var bdProductos = {
    'rosquillas': {
        id: 'rosquillas',
        img: 'img/productos/Rosquillas.png',
        titulo: 'Rosquillas Tradicionales',
        precio: 120,
        unidad: 'Bolsa',
        desc: 'Nuestras rosquillas son elaboradas con la auténtica receta de El Viejo, Chinandega. Hechas a base de maíz tostado, queso seco y mantequilla, horneadas a la perfección en hornos de leña tradicionales.'
    },
    'hojaldras': {
        id: 'hojaldras',
        img: 'img/productos/Hojaldras.png',
        titulo: 'Hojaldras Crujientes',
        precio: 150,
        unidad: 'Bolsa',
        desc: 'Deliciosas hojaldras horneadas con un toque dulce y una textura suave por dentro pero crujiente por fuera. El balance perfecto de ingredientes tradicionales para endulzar tu tarde.'
    },
    'rosquetes': {
        id: 'rosquetes',
        img: 'img/productos/Rosquetes.png',
        titulo: 'Rosquetes Bañados',
        precio: 110,
        unidad: 'Bolsa',
        desc: 'Tradicionales rosquetes bañados en dulce, con esa cubierta blanca azucarada que se deshace en la boca. Un verdadero clásico de la gastronomía chinandegana.'
    },
    'cosasdehorno': {
        id: 'cosasdehorno',
        img: 'img/productos/Cosadehorno.png',
        titulo: 'Cosas de Horno Variadas',
        precio: 140,
        unidad: 'Bandeja',
        desc: 'Una selección de nuestras mejores cosas de horno: perrereque, empanadas de queso, y más. Todo recién horneado con la tradición que nos caracteriza.'
    },
    'pupusas': {
        id: 'pupusas',
        img: 'img/productos/Pupusas.png',
        titulo: 'Pupusas Tostadas',
        precio: 120,
        unidad: 'Unidad',
        desc: 'Nuestra especialidad para eventos: pupusas de quesillo tostadas al horno. Ideales para compartir, servidas con su tradicional curtido.'
    },
    'empanadas': {
        id: 'empanadas',
        img: 'img/productos/Empanadas.png',
        titulo: 'Empanadas Dulces',
        precio: 130,
        unidad: 'Bandeja',
        desc: 'Empanadas dulces tradicionales, perfectas para acompañar tu café o como postre después de una buena comida nicaragüense.'
    }
};

/* ── Utilidades del carrito (localStorage) ── */
function getCarrito() {
    var data = localStorage.getItem('carrito');
    return data ? JSON.parse(data) : [];
}

function saveCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function agregarAlCarrito(productoId, cantidad) {
    var carrito = getCarrito();
    var existe = false;

    for (var i = 0; i < carrito.length; i++) {
        if (carrito[i].id === productoId) {
            carrito[i].cantidad += cantidad;
            existe = true;
            break;
        }
    }

    if (!existe) {
        carrito.push({ id: productoId, cantidad: cantidad });
    }

    saveCarrito(carrito);
}

function eliminarDelCarrito(productoId) {
    var carrito = getCarrito();
    carrito = carrito.filter(function (item) { return item.id !== productoId; });
    saveCarrito(carrito);
}

function actualizarCantidad(productoId, nuevaCantidad) {
    if (nuevaCantidad < 1) return;
    var carrito = getCarrito();
    for (var i = 0; i < carrito.length; i++) {
        if (carrito[i].id === productoId) {
            carrito[i].cantidad = nuevaCantidad;
            break;
        }
    }
    saveCarrito(carrito);
}

function getTotalCarrito() {
    var carrito = getCarrito();
    var total = 0;
    for (var i = 0; i < carrito.length; i++) {
        var prod = bdProductos[carrito[i].id];
        if (prod) {
            total += prod.precio * carrito[i].cantidad;
        }
    }
    return total;
}
