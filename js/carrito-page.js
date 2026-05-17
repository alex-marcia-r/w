/* carrito-page.js — Renderiza y controla la página del carrito */

function renderCarrito() {
    var carrito = getCarrito();
    var tbody = document.getElementById('carrito-body');
    var totalEl = document.getElementById('carrito-total-valor');
    var seccionVacia = document.getElementById('carrito-vacio');
    var seccionLlena = document.getElementById('carrito-lleno');

    // Si el carrito está vacío
    if (carrito.length === 0) {
        seccionVacia.style.display = 'block';
        seccionLlena.style.display = 'none';
        return;
    }

    seccionVacia.style.display = 'none';
    seccionLlena.style.display = 'block';
    tbody.innerHTML = '';

    var total = 0;

    for (var i = 0; i < carrito.length; i++) {
        var item = carrito[i];
        var prod = bdProductos[item.id];
        if (!prod) continue;

        var subtotal = prod.precio * item.cantidad;
        total += subtotal;

        var tr = document.createElement('tr');
        tr.innerHTML =
            '<td class="carrito-producto-cell">' +
                '<img src="' + prod.img + '" alt="' + prod.titulo + '" class="carrito-thumb">' +
                '<span>' + prod.titulo + '</span>' +
            '</td>' +
            '<td>' +
                '<div class="cantidad-control">' +
                    '<button class="btn-qty btn-qty-menos" data-id="' + item.id + '"><i class="bx bx-minus"></i></button>' +
                    '<span class="cantidad-valor">' + item.cantidad + '</span>' +
                    '<button class="btn-qty btn-qty-mas" data-id="' + item.id + '"><i class="bx bx-plus"></i></button>' +
                '</div>' +
            '</td>' +
            '<td>C$ ' + prod.precio.toFixed(2) + '</td>' +
            '<td>C$ ' + subtotal.toFixed(2) + '</td>' +
            '<td><button class="btn-eliminar" data-id="' + item.id + '"><i class="bx bx-trash"></i></button></td>';

        tbody.appendChild(tr);
    }

    totalEl.textContent = 'C$ ' + total.toFixed(2);

    // Event listeners para botones de cantidad
    var btnesMenos = document.querySelectorAll('.btn-qty-menos');
    var btnesMas = document.querySelectorAll('.btn-qty-mas');
    var btnesEliminar = document.querySelectorAll('.btn-eliminar');

    btnesMenos.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var id = this.getAttribute('data-id');
            var carrito = getCarrito();
            for (var j = 0; j < carrito.length; j++) {
                if (carrito[j].id === id && carrito[j].cantidad > 1) {
                    actualizarCantidad(id, carrito[j].cantidad - 1);
                    break;
                }
            }
            renderCarrito();
        });
    });

    btnesMas.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var id = this.getAttribute('data-id');
            var carrito = getCarrito();
            for (var j = 0; j < carrito.length; j++) {
                if (carrito[j].id === id) {
                    actualizarCantidad(id, carrito[j].cantidad + 1);
                    break;
                }
            }
            renderCarrito();
        });
    });

    btnesEliminar.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var id = this.getAttribute('data-id');
            eliminarDelCarrito(id);
            renderCarrito();
        });
    });
}

// Render inicial
renderCarrito();
