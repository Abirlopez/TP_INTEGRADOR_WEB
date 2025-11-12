// ==== FORMULARIO DE INSCRIPCIÓN DINÁMICO ====

const tipoRadios = document.querySelectorAll('input[name="tipo"]'); // radios personal / empresa
const formulario = document.getElementById('formulario-inscripcion');
const filaBase = document.querySelector('.fila-inscripcion'); // la primera fila que viene en el form
const botonAgregar = document.querySelector('.boton-agregar'); // botón "+"
const precioSpan = document.querySelector('.precio'); // texto que muestra el total $
const botonInscribirse = document.querySelector('.boton-inscribirse'); // botón principal

const PRECIO_BASE = 100;          // precio base del curso
const PRECIO_POR_PERSONA = 20;    // adicional por persona si es empresa

let tipo = 'personal';            // arranca como inscripción personal
let cantidadPersonas = 1;         // arranca con una persona

// cuando cambia el tipo (personal o empresa)
tipoRadios.forEach(radio => {
  radio.addEventListener('change', e => {
    tipo = e.target.value;
    actualizarVistaSegunTipo();
  });
});

// función que muestra / oculta cosas según el tipo
function actualizarVistaSegunTipo() {
  const filas = document.querySelectorAll('.fila-inscripcion');

  if (tipo === 'personal') {
    // si es personal, dejo solo la primera fila visible
    filas.forEach((fila, index) => {
      if (index === 0) fila.style.display = 'flex';
      else fila.remove();
    });
    cantidadPersonas = 1;
    botonAgregar.style.display = 'none'; // oculto el botón +
  } else {
    botonAgregar.style.display = 'block'; // lo muestro si es empresa
  }

  recalcularTotal(); // actualizo el total
}

// botón "+" → agrega una nueva fila
botonAgregar.addEventListener('click', () => {
  const nuevaFila = filaBase.cloneNode(true); // clono la fila original
  nuevaFila.querySelectorAll('input').forEach(input => input.value = ''); // limpio los campos

  // meto la nueva fila antes del bloque de botones del form
  formulario.insertBefore(nuevaFila, document.querySelector('.acciones-formulario'));

  cantidadPersonas++; // aumento el contador
  agregarEventosEliminar(nuevaFila); // le agrego su botón de eliminar
  recalcularTotal(); // recalculo el total
});

// asigna la función al botón eliminar dentro de cada fila
function agregarEventosEliminar(fila) {
  const btnEliminar = fila.querySelector('.boton-eliminar');
  btnEliminar.addEventListener('click', () => {
    if (tipo === 'empresa' && cantidadPersonas > 1) {
      fila.remove();             // borro la fila del DOM
      cantidadPersonas--;        // resto una persona
      recalcularTotal();         // recalculo el precio
    } else {
      // si es la primera fila (modo personal), solo limpio los inputs
      fila.querySelectorAll('input').forEach(i => i.value = '');
    }
  });
}

agregarEventosEliminar(filaBase); // le doy el evento a la primera fila también

// calcula el total según el tipo y cantidad de personas
function recalcularTotal() {
  let total = PRECIO_BASE;
  if (tipo === 'empresa') total += (cantidadPersonas - 1) * PRECIO_POR_PERSONA;
  precioSpan.textContent = `$${total}.-`; // actualizo el texto
}

// cuando se hace clic en "Inscribirse"
botonInscribirse.addEventListener('click', e => {
  e.preventDefault();

  // saco los datos de cada fila del formulario
  const personas = [...document.querySelectorAll('.fila-inscripcion')].map(fila => {
    const inputs = fila.querySelectorAll('input');
    return {
      nombre: inputs[0].value,
      apellido: inputs[1].value,
      telefono: inputs[2].value
    };
  });

  // armo un texto resumen con todos los nombres y apellidos
  const resumen = personas
    .map((p, i) => `${i + 1}. ${p.nombre || '-'} ${p.apellido || '-'}`)
    .join('\n');

  // muestro un alert con el resumen final
  alert(`Inscripción completada (${tipo.toUpperCase()})\n\n${resumen}`);
});
