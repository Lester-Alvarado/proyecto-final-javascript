const miTextoAnimado = document.getElementById("miTextoAnimado");

// Mi animacion
new TypeIt(miTextoAnimado, {
  strings: ["¡Hola!", "Bienvenido a tu portal de tareas"],
  speed: 75,
  loop: true,
}).go();
