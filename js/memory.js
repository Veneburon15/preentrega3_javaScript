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
// Mostrar contenido del Session Storage
sessionDataDiv.innerHTML = sessionHTML;

// Obtener los datos del Local Storage
const localData = localStorage.getItem("estudiantes");

// Convertir los datos en un array de objetos
let estudiantes = [];
if (localData) {
  estudiantes = JSON.parse(localData);
}

// Ordenar los estudiantes por fecha (supongamos que tienes una propiedad "fecha" en cada estudiante)
estudiantes.sort((a, b) => {
  const dateA = new Date(a.fecha);
  const dateB = new Date(b.fecha);
  return dateA - dateB;
});

// Generar contenido HTML para mostrar los estudiantes ordenados por fecha
let localHTML = "<h3>Registro Histórico Ordenado por Fecha</h3>";
localHTML += "<ul>";
estudiantes.forEach((estudiante) => {
  localHTML += `<li>${estudiante.nombre} - Fecha: ${estudiante.fecha}</li>`;
});
localHTML += "</ul>";

// Mostrar contenido del Local Storage ordenado por fecha
localDataDiv.innerHTML = localHTML;