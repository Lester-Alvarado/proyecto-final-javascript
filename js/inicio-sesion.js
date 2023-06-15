function validarFormulario(event) {
  var correoInput = document.getElementById("correo-input");
  var contrasenaInput = document.getElementById("contrasena-input");

  if (correoInput.value.trim() === '' || contrasenaInput.value.trim() === '') {
    event.preventDefault(); // Evita que se envíe el formulario
    alert('Por favor, complete todos los campos.');
    return false;
  }
  
  return iniciarSesion(event);
}


function iniciarSesion(event) {
  event.preventDefault(); // Evita que se envíe el formulario

  var correo = document.getElementById("correo-input").value;
  var contrasena = document.getElementById("contrasena-input").value;

  //encontrar los input para dejarlos con un valor vacio si hay un alert
  var correoInput = document.getElementById("correo-input");
  var contrasenaInput = document.getElementById("contrasena-input");

  // Comprobamos si el navegador es compatible con localStorage
  if (typeof localStorage !== "undefined") {
    // Obtenemos los registros existentes del Local Storage
    var registros = JSON.parse(localStorage.getItem("registros"));
    
    if (registros) {
      // Buscamos el registro correspondiente al correo ingresado
      var registroEncontrado = registros.find(function (registro) {
        return registro.correo === correo;
      });
      
      if (registroEncontrado && registroEncontrado.contrasena === contrasena) {
        // Inicio de sesión exitoso, redireccionar a otra página
        localStorage.setItem('correo', correo);
        window.location.href = "../html/calendario.html";
        alert("Inicio de sesión exitoso");
      } else {
        alert("Correo o contraseña incorrectos");
        correoInput.value = '';
        contrasenaInput.value = ''
      }
    } else {
      alert("No hay registros de usuarios almacenados");
      correoInput.value = '';
      contrasenaInput.value = ''
    }
  } else {
    console.log("Lo siento, tu navegador no soporta localStorage.");
  }
    // Eliminar el valor del correo del localStorage después de usarlo, habilitar si es necesario
    // localStorage.removeItem('correo');
} 