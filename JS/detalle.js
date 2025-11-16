// Inicializo el contador en el header
// agarro el elemento del contador en el header
const contadorCarrito = document.getElementById('preview-unidades');

// si ya hay algo guardado en sessionStorage, lo uso
let cantidadCursos = sessionStorage.getItem('cantidadCursos');

// si no hay nada, lo creo desde cero
if (!cantidadCursos) {
    cantidadCursos = 0;
    sessionStorage.setItem('cantidadCursos', cantidadCursos);
}
// muestro el valor actual del contador
if(contadorCarrito) {
    contadorCarrito.textContent = cantidadCursos;
}


document.addEventListener('DOMContentLoaded', () => {
    // Metodo para buscar y obtener el curso seleccionado
    const urlParams = new URLSearchParams(window.location.search);
    const cursoId = parseInt(urlParams.get('id')); 

    if (isNaN(cursoId)) return;

    const cursosJSON = localStorage.getItem('cursos');
    if (!cursosJSON) return;

    const cursos = JSON.parse(cursosJSON);
    const cursoActual = cursos.find(curso => curso.id === cursoId);

    if (!cursoActual) return;

    // Carga de datos para la pagina

    const botonInscribirse = document.getElementById('btn-inscribirse');

    document.querySelector('title').textContent = `${cursoActual.titulo}`;   
    document.getElementById('curso-titulo-detalle').textContent = `${cursoActual.titulo.toUpperCase()}`;
    document.getElementById('curso-valor-detalle').textContent = `U$D ${cursoActual.precio}`;
    document.getElementById('curso-duracion-detalle').textContent = '30 Horas'; 
    document.getElementById('curso-desc-detalle').textContent = cursoActual.descripcion;
        const imgDetalle = document.getElementById('curso-imagen-detalle');    
          imgDetalle.src = `../${cursoActual.imagen}`;
          imgDetalle.alt = `Foto del ${cursoActual.titulo}`;

    // Metodo para el carrito y el modal

    const modal = document.getElementById('modal-felicitacion');
    const cerrarModal = document.getElementById('cerrar-modal');
    const aceptarModal = document.getElementById('aceptar-modal');
    const detalleCursoModal = document.getElementById('detalle-curso');
    
    
    function agregarACarrito(curso) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        
        const cursoExistenteIndex = carrito.findIndex(item => item.id === curso.id);

        if (cursoExistenteIndex !== -1) {
            carrito[cursoExistenteIndex].cantidad += 1;
        } else {
            carrito.push({
                id: curso.id,
                titulo: curso.titulo,
                precio: curso.precio,
                imagen: curso.imagen,
                cantidad: 1
            });
        }
        
        localStorage.setItem('carrito', JSON.stringify(carrito));
        
        // Actualizar el contador de unidades en sessionStorage
        let cantidadCursos = parseInt(sessionStorage.getItem('cantidadCursos')) || 0;
        cantidadCursos += 1;
        sessionStorage.setItem('cantidadCursos', cantidadCursos);
        
    }

if (botonInscribirse) {
    botonInscribirse.addEventListener('click', e => {
        e.preventDefault(); 
        
        // Añade el curso al carrito
        agregarACarrito(cursoActual); 
        
        // Muestra el modal con la descripcion
        detalleCursoModal.textContent = `${cursoActual.titulo} — Valor: U$D ${cursoActual.precio}`;
        modal.style.display = 'flex';
    });
}

    // Evento de aceptar redirige a pagar
   aceptarModal.addEventListener('click', () => {
    modal.style.display = 'none';
    window.location.href = '../Paginas/carrito.html';
});

    // Eventos para cerrar el modal
    cerrarModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', e => {
        if (e.target === modal) modal.style.display = 'none';
    });
});