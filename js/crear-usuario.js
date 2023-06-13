function guardarRegistro(event) {
  event.preventDefault(); // Evita que se envíe el formulario

  var nombres = document.getElementById("nombres-input").value;
  var apellidos = document.getElementById("apellidos-input").value;
  var correo = document.getElementById("correo-input").value;
  var contrasena = document.getElementById("contrasena-input").value;

  var registro = {
    nombres: nombres,
    apellidos: apellidos,
    correo: correo,
    contrasena: contrasena
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
}

