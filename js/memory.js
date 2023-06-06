const sessionDataDiv = document.getElementById("session-storage-data");
const localDataDiv = document.getElementById("local-storage-data");
const finalDiv = document.getElementById("final");
const unsplashAPI = 'https://api.unsplash.com/search/photos?query=teacher&client_id=kPRGje6wBX77MKijLObZFER5LRHPIcYknI2dkgTsiVo'

//SESSION STORAGE
const sessionData = sessionStorage.getItem("estudiantesSession");

// Generar contenido HTML para el Session Storage
let sessionHTML = "<h3>Registro de Sesión</h3>";
sessionHTML += "<ul>";
if (sessionData) {
  const estudiantes = JSON.parse(sessionData);
  estudiantes.forEach((estudiante) => {
    sessionHTML += `<li>${estudiante.nombre} - Promedio: ${estudiante.promedio}</li>`;
  });
}
sessionHTML += "</ul>";

//Se pueden ordenar mejor los datos, en forma de tabla

// Mostrar contenido del Session Storage
sessionDataDiv.innerHTML = sessionHTML;

// Obtener los datos del Local Storage
const localData = localStorage.getItem("estudiantesHistorial");

// Generar contenido HTML para el Local Storage
let localHTML = "<h3>Registro Histórico</h3>";
localHTML += "<ul>";
if (localData) {
  const estudiantes = JSON.parse(localData);
  estudiantes.forEach((estudiante) => {
    localHTML += `<li>${estudiante.nombre} - Promedio: ${estudiante.promedio}</li>`;
  });
}
localHTML += "</ul>";
// Mostrar contenido del Local Storage
localDataDiv.innerHTML = localHTML;


// // Ordenar los estudiantes por fecha (supongamos que tienes una propiedad "fecha" en cada estudiante)
// estudiantes.sort((a, b) => {
//   const dateA = new Date(a.fecha);
//   const dateB = new Date(b.fecha);
//   return dateA - dateB;
// });


//fetch(unsplashAPI)
// .then((response) => response.json())
// .then((data) => {
//   data.forEach((pic) => {
//     let boxCreation = document.createElement("tr");
//     boxCreation.textContent = usuario.name + ", Teléfono " + usuario.phone;
//     finalDiv.append(boxCreation)
    
//   })
// })

//Oye profe, practica un pco tu ingles leyendo estas frases...

const url = 'https://api.quotable.io/random'
function getQuote() {
  fetch(url)
    .then(response => response.json())
    .then((data) => {
      Toastify({
        text: data.content + " Author: " + data.author,
        gravity: 'bottom',
        position: 'left',
	      duration: 8000,
      }).showToast();
    })
}
setInterval(getQuote, 9000);