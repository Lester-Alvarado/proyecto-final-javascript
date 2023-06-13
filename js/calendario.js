const boton = document.getElementById("cerrar-sesion-btn")
boton.addEventListener("click", cerrarSesion);
var registros = JSON.parse(localStorage.getItem("registros"));

var correo = window.opener.document.getElementById("correo-input")
var valorInput = correo.value;
console.log(valorInput)

// var registroEncontrado = registros.find(function (registro) {
//   return registro.correo === correo;
// });

function cerrarSesion(){
    // Elimina el registro del usuario actual del Local Storage o realiza cualquier otra acción necesaria para cerrar la sesión
    // localStorage.removeItem("registros");

    // Redirecciona al usuario a la página de inicio de sesión o a cualquier otra página deseada
    window.location.href = "../html/inicio-sesion.html";
}


