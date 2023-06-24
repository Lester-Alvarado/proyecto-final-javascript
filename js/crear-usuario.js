function validarFormulario(event) {
  var nombresInput = document.getElementById("nombres-input");
  var apellidosInput = document.getElementById("apellidos-input");
  var correoInput = document.getElementById("correo-input");
  var contrasenaInput = document.getElementById("contrasena-input");

  if (nombresInput.value.trim() === '' || apellidosInput.value.trim() === '' || correoInput.value.trim() === '' || contrasenaInput.value.trim() === '') {
    event.preventDefault(); // Evita que se envíe el formulario
    alert('Por favor, complete todos los campos.');
    return false;
  }

  return guardarRegistro(event);
}


function guardarRegistro(event) {
  event.preventDefault(); // Evita que se envíe el formulario

  var nombres = document.getElementById("nombres-input").value;
  var apellidos = document.getElementById("apellidos-input").value;
  var correo = document.getElementById("correo-input").value;
  var contrasena = document.getElementById("contrasena-input").value;

  // Función para verificar la fortaleza de la contraseña
  function verificarContrasena(contrasena) {
    // Expresión regular para verificar la fortaleza de la contraseña
    var patron = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

    if (patron.test(contrasena)) {
      return true; // La contraseña cumple con los requisitos
    } else {
      return false; // La contraseña no cumple con los requisitos
    }
  }
  
  if (verificarContrasena(contrasena)) {
    alert("Contraseña válida. Usuario creado con éxito.");
    var registro = {
      nombres: nombres,
      apellidos: apellidos,
      correo: correo,
      contrasena: contrasena,
    };

    // Comprobamos si el navegador es compatible con localStorage
    if (typeof localStorage !== "undefined") {
      // Obtenemos los registros existentes o inicializamos una lista vacía
      var registros = JSON.parse(localStorage.getItem("registros")) || [];

      // Agregamos el nuevo registro a la lista de registros
      registros.push(registro);

      // Guardamos la lista actualizada en localStorage
      localStorage.setItem("registros", JSON.stringify(registros));

      // Redireccionar a otra página después de guardar el registro
      window.location.href = "../html/index.html";

      alert("Tu usuario fue creado Exitosamente puedes Iniciar Sesion");
    } else {
      console.log("Lo siento, tu navegador no soporta localStorage.");
    }
  } else {
    alert(
      "Contraseña inválida. La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número."
    );
  }
}

