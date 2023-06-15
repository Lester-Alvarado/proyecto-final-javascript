const boton = document.getElementById("cerrar-sesion-btn")
boton.addEventListener("click", cerrarSesion);
var registros = JSON.parse(localStorage.getItem("registros"));

function cerrarSesion(){
    // Elimina el registro del usuario actual del Local Storage o realiza cualquier otra acción necesaria para cerrar la sesión
    // localStorage.removeItem("registros");

    // Redirecciona al usuario a la página de inicio de sesión o a cualquier otra página deseada
    window.location.href = "../html/inicio-sesion.html";
}

// codigo para poner 
var correoApertura = localStorage.getItem("correo")
var usuarioEncontrado = registros.find(function (registro) {
    return registro.correo === correoApertura;
});
var nombreApellidos = `Hola ${usuarioEncontrado.nombres} ${usuarioEncontrado.apellidos}`
console.log(nombreApellidos)
let encabezado = document.getElementById("encabezado")
encabezado.textContent = nombreApellidos





//aqui inicia todo para el registro de tareas///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const fecha = document.querySelector('#fecha')
const lista = document.querySelector('#lista')
const elemento = document.querySelector('#elemento')
const input = document.querySelector('#input')
const botonEnter = document.querySelector('#boton-enter')
const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const lineThrough = 'line-through'
let LIST

let id // para que inicie en 0 cada tarea tendra un id diferente

//creacion de fecha actualizada 

const FECHA = new Date ()
fecha.innerHTML = FECHA.toLocaleDateString('es-GT',{weekday: 'long', month: 'short', day:'numeric'})







// funcion de agregar tarea 

function agregarTarea( tarea,id,realizado,eliminado) {
    if(eliminado) {return} // si existe eliminado es true si no es false 

    const REALIZADO = realizado ? check : uncheck // si realizado es verdadero check si no uncheck

    const LINE = realizado ? lineThrough : '' 

    const elemento = `
        <li id="elemento-${id}">
        <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
        <p class="text ${LINE}">${tarea}</p>
        <div id="ultimos">
        <i class="fa-sharp fa-solid fa-pencil"></i>
        <i class="fas fa-edit edit" data="editar" id="${id}" onclick="editarTarea(${id})"></i> 
        <i class="fas fa-trash de" data="eliminado" id="${id}" ></i> 
        <div>
    </li>
    `;
    lista.insertAdjacentHTML("beforeend",elemento)

}

function editarTarea(id) {
    const tareaElemento = document.querySelector(`#elemento-${id} .text`);
    const tareaTexto = tareaElemento.textContent;
    tareaElemento.innerHTML = `
    <input type="text" class="edit-input" value="${tareaTexto}" onkeyup="guardarEdicion(event, ${id})" autofocus>
    `;
}

function guardarEdicion(event, id) {
    if (event.key === 'Enter') {
        const tareaElemento = document.querySelector(`#elemento-${id} .text`);
        const nuevaTarea = event.target.value;
        tareaElemento.textContent = nuevaTarea;
      // Actualizar la tarea en el arreglo LIST
        LIST[id].nombre = nuevaTarea;
        localStorage.setItem('TODO', JSON.stringify(LIST));
    }
}


// funcion de Tarea Realizada 

function tareaRealizada(element) {
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)
    LIST[element.id].realizado = LIST[element.id].realizado ?false :true //Si
   // console.log(LIST)
   // console.log(LIST[element.id])
   // console.log(LIST[element.id].realizado)
}

function tareaEliminada(element){
   // console.log(element.parentNode)
   // console.log(element.parentNode.parentNode)
    element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode)
    LIST[element.id].eliminado = true
    console.log(LIST)
}





// crear un evento para escuchar el enter y para habilitar el boton 

botonEnter.addEventListener('click', ()=> {
    const tarea = input.value
    const correo = localStorage.getItem("correo");
    if(tarea){
        agregarTarea(tarea,id,false,false, correo)
        LIST.push({
            nombre : tarea,
            id : id,
            realizado : false,
            eliminado : false,
            correo : correo
        })
        localStorage.setItem('TODO',JSON.stringify(LIST))
        id++
        input.value = ''
    }

})

document.addEventListener('keyup', function (event) {
    if (event.key=='Enter'){
        const tarea = input.value
        const correo = localStorage.getItem("correo")
        if(tarea) {
            agregarTarea(tarea,id,false,false,correo)
        LIST.push({
            nombre : tarea,
            id : id,
            realizado : false,
            eliminado : false,
            correo: correo
        })
        localStorage.setItem('TODO',JSON.stringify(LIST))

        input.value = ''
        id++
        console.log(LIST)
        }
    }
    
})


lista.addEventListener('click',function(event){
    const element = event.target 
    const elementData = element.attributes.data.value
    console.log(elementData)
    
    if(elementData == 'realizado') {
        tareaRealizada(element)
    }
    else if(elementData == 'eliminado') {
        tareaEliminada(element)
        console.log("elimnado")
    }
    localStorage.setItem('TODO',JSON.stringify(LIST))
})




let data = localStorage.getItem('TODO')
if(data){
    LIST = JSON.parse(data)
    console.log(LIST)
    id = LIST.length
    cargarLista(LIST)
}else {
    LIST = []
    id = 0
}


function cargarLista(array) {
    array.forEach(function(item) {
      if (item.correo === correoApertura) { // Verificar si la tarea pertenece al correo de inicio de sesión
        agregarTarea(item.nombre, item.id, item.realizado, item.eliminado);
    }
    });
}