const contadorCarrito = document.getElementById ('preview-unidades'); //Agarramos el elementor del contador 

if (contadorCarrito) {

    let cantidadCursos = sessionStorage.getItem('cantidadCursos');

    if (!cantidadCursos) {
        cantidadCursos = 0;
        sessionStorage.setIte('cantidadCursos', cantidadCursos);
    }

    contadorCarrito.textContent = cantidadCursos;
}

const botonesInscribirse = document.querySelectorAll('.btn-inscribirse, .curso-boton');

botonesInscribirse.forEach(boton => {
    boton.addEventListener('click', () => {
        let cantidadCursos = parseInt(sessionStorage.getItem('cantidadCursos')) || 0;
        cantidadCursos++;
    sessionStorage.setItem('cantidadCursos', cantidadCursos);

    const contadorCarrito = document.getElementById('preview-unidades');
    if (contadorCarrito) contadorCarrito.textContent = cantidadCursos;
});
});

