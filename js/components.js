/* ─────────────────────────────────────────
   components.js
   Carga header y footer desde partials/,
   luego aplica el link activo y el sticky.
───────────────────────────────────────── */

/**
 * Inserta el HTML de un partial en el placeholder dado y
 * ejecuta el callback cuando termina.
 */


function loadComponent(placeholderId, file, callback) {
    fetch(file)
        .then(function (res) {
            if (!res.ok) throw new Error('No se pudo cargar: ' + file);
            return res.text();
        })
        .then(function (html) {
            document.getElementById(placeholderId).innerHTML = html;
            if (callback) callback();
        })
        .catch(function (err) {
            console.error(err);
        });
}

/**
 * Marca como "active" el enlace del nav que coincide con la página actual.
 * Compara solo el nombre de archivo (ej. "productos.html").
 */
function setActiveLink() {
    var page = window.location.pathname.split('/').pop();
    /* Si la ruta termina en '/' o está vacía, es el index */
    if (!page || page === '') page = 'index.html';

    var links = document.querySelectorAll('.nav-list a');
    links.forEach(function (link) {
        var href = link.getAttribute('href').split('/').pop();
        if (href === page) {
            link.classList.add('active');
        }
    });
}

/**
 * Activa la clase "sticky" en el header al hacer scroll.
 * Se llama DESPUÉS de que el header ya está en el DOM.
 */
function initStickyHeader() {
    var header = document.querySelector('header');
    if (!header) return;
    window.addEventListener('scroll', function () {
        header.classList.toggle('sticky', window.scrollY > 70);
    });
}

/* ── Carga los componentes ── */
loadComponent('header-placeholder', 'partials/header.html', function () {
    setActiveLink();
    initStickyHeader();
});

loadComponent('footer-placeholder', 'partials/footer.html');
