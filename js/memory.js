const sessionDataDiv = document.getElementById("session-storage-data");
const localDataDiv = document.getElementById("local-storage-data")

//SESSION STORAGE
const sessionData = sessionStorage.getItem("estudiantes");

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

//LOS DATOS DEL SESSION STORAGE NO SE SOBREESCRIBEN, PERO NO SE ESTAN PUDIENDO SEPARAR LOS DEL SISSISON CON LOS DEL LOCAL, ASI QUE CUANDO TOCO LOS DOS BOTONES, SE ME DUPLICAN EN EL LOCAL STORAGE



// // Ordenar los estudiantes por fecha (supongamos que tienes una propiedad "fecha" en cada estudiante)
// estudiantes.sort((a, b) => {
//   const dateA = new Date(a.fecha);
//   const dateB = new Date(b.fecha);
//   return dateA - dateB;
// });

// // Generar contenido HTML para mostrar los estudiantes ordenados por fecha
// let localHTML = "<h3>Registro Histórico Ordenado por Fecha</h3>";
// localHTML += "<ul>";
// estudiantes.forEach((estudiante) => {
//   localHTML += `<li>${estudiante.nombre} - Fecha: ${estudiante.fecha}</li>`;
// });
// localHTML += "</ul>";