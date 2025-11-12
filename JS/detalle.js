// ==== MODAL DE FELICITACIÓN ====

// agarro todos los elementos que necesito del modal
const modal = document.getElementById('modal-felicitacion');
const cerrarModal = document.getElementById('cerrar-modal');
const aceptarModal = document.getElementById('aceptar-modal');
const botonInscribirse = document.querySelector('.btn-inscribirse');
const detalleCurso = document.getElementById('detalle-curso');

// si existe el botón de inscribirse, lo meto el evento
if (botonInscribirse) {
  botonInscribirse.addEventListener('click', e => {
    e.preventDefault(); // cancelo el comportamiento por defecto (redirigir)

    // muestro el modal (flex para centrar)
    modal.style.display = 'flex';

    // agrego la info del curso dentro del modal
    detalleCurso.textContent = 'Curso de JavaScript — Duración: 30 horas — Valor: U$D 65';
  });
}

// cuando toca la X, cierro el modal
cerrarModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

// cuando toca "Aceptar", cierro el modal y lo mando al carrito
aceptarModal.addEventListener('click', () => {
  modal.style.display = 'none';
  window.location.href = '../Paginas/carrito.html'; // redirige al carrito
});

// si hace clic afuera del modal, también lo cierro
window.addEventListener('click', e => {
  if (e.target === modal) modal.style.display = 'none';
});
