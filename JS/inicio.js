// ==== CONTADOR DE CURSOS ====

// agarro el elemento del contador en el header
const contadorCarrito = document.getElementById('preview-unidades');

// si ya hay algo guardado en sessionStorage, lo uso
let cantidadCursos = sessionStorage.getItem('cantidadCursos');

// si no hay nada, lo creo desde cero
if (!cantidadCursos) {
  cantidadCursos = 0;
  sessionStorage.setItem('cantidadCursos', cantidadCursos); // arranco en 0
}

// muestro el valor actual del contador
contadorCarrito.textContent = cantidadCursos;

// selecciono todos los botones de "VER CURSO"
const botonesCurso = document.querySelectorAll('.curso-boton');

// recorro los botones y les doy la función de sumar al contador
botonesCurso.forEach(boton => {
  boton.addEventListener('click', () => {
    // agarro el valor actual del contador y lo paso a número
    cantidadCursos = parseInt(sessionStorage.getItem('cantidadCursos'));

    cantidadCursos++; // sumo 1

    // actualizo el valor en sessionStorage
    sessionStorage.setItem('cantidadCursos', cantidadCursos);

    // muestro el nuevo número en el contador
    contadorCarrito.textContent = cantidadCursos;
  });
});


// SLIDER 

// selecciono las imágenes del slider y los puntitos
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let indice = 0; // guarda el número del slide que está visible

// función que muestra el slide correspondiente y actualiza los puntitos
function mostrarSlide(i) {
  slides.forEach((slide, index) => {
    // si el índice coincide con el slide que quiero mostrar, lo activo
    slide.classList.toggle('active', index === i);
    dots[index].classList.toggle('active', index === i); // mismo con los puntitos
  });

  indice = i; // guardo el slide actual
}

// cambio automático cada 4 segundos
setInterval(() => {
  // paso al siguiente slide, y si estoy en el último, vuelvo al primero
  indice = (indice + 1) % slides.length;

  // muestro el nuevo slide
  mostrarSlide(indice);
}, 4000); // 4 segundos

// control manual con clics en los puntitos
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    mostrarSlide(i); // muestro el slide correspondiente al puntito clickeado
  });
});
