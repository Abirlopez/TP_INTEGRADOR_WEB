/* SISTEMA DE USUARIOS */

// los usuarios se guardan en localStorage bajo la clave 'usuarios'


// REGISTRO DE NUEVO USUARIO 

// agarro el form de registro si existe en la página
const formRegistro = document.getElementById('form-registro');

if (formRegistro) {
  formRegistro.addEventListener('submit', e => {
    e.preventDefault(); // evito que se recargue la página

    // agarro los valores del form
    const nombre = document.getElementById('registro-nombre').value.trim();
    const email = document.getElementById('registro-email').value.trim();
    const password = document.getElementById('registro-password').value.trim();

    // chequeo que no haya campos vacíos
    if (!nombre || !email || !password) {
      alert('Completá todos los campos.');
      return;
    }

    // traigo los usuarios guardados, o arranco con un array vacío
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // reviso si ya existe alguien con ese mail
    if (usuarios.some(u => u.email === email)) {
      alert('Ya existe una cuenta con ese correo.');
      return;
    }

    // creo el nuevo usuario y lo agrego al array
    const nuevoUsuario = { nombre, email, password };
    usuarios.push(nuevoUsuario);

    // guardo todo actualizado en localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Cuenta creada exitosamente. Ahora podés iniciar sesión.');
    window.location.href = 'login.html'; // redirige al login
  });
}


// INICIO DE SESIÓN 

const formLogin = document.getElementById('form-login');

if (formLogin) {
  formLogin.addEventListener('submit', e => {
    e.preventDefault();

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();

    // traigo los usuarios guardados (si no hay, queda vacío)
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // busco uno que coincida con el mail y la contraseña
    const usuarioValido = usuarios.find(u => u.email === email && u.password === password);

    // si no encontró ninguno, muestro error
    if (!usuarioValido) {
      alert('Credenciales inválidas. Revisá tu email o contraseña.');
      return;
    }

    // si encontró, lo guardo como usuario activo en sessionStorage
    sessionStorage.setItem('usuarioActivo', JSON.stringify(usuarioValido));

    alert(`Bienvenido, ${usuarioValido.nombre}`);
    window.location.href = '../index.html'; // redirige al inicio
  });
}


//  USUARIO ACTIVO 

// si hay alguien logueado, lo muestro en consola
const usuarioActivo = JSON.parse(sessionStorage.getItem('usuarioActivo'));
if (usuarioActivo) {
  console.log(`Usuario logueado: ${usuarioActivo.nombre}`);
}


// ELIMINAR CUENTA 


function eliminarCuenta(email) {
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  // filtro todos menos el que quiero eliminar
  const nuevosUsuarios = usuarios.filter(u => u.email !== email);

  // guardo el nuevo array sin ese usuario
  localStorage.setItem('usuarios', JSON.stringify(nuevosUsuarios));

  // borro la sesión activa
  sessionStorage.removeItem('usuarioActivo');

  alert('Tu cuenta ha sido eliminada.');
  window.location.href = '../index.html'; // vuelvo al inicio
}
