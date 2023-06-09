//Llamamiento del DOM y API's
const sessionDataDiv = document.getElementById("session-storage-data");
const localDataDiv = document.getElementById("local-storage-data");
const quotesShooter = document.getElementById("quotesShooter");
const quotesStopper = document.getElementById("quotesStopper");
const ordenarMejoresBtn = document.getElementById("ordenarMejores");
const ordenarPeoresBtn = document.getElementById("ordenarPeores");
const url = 'https://api.quotable.io/random';


//SESSION STORAGE Llamamiento de infromación
// Obtener los datos del Session Storage
const sessionData = sessionStorage.getItem("estudiantesSession");
// Generar contenido HTML para el Session Storage
let sessionHTML = "<h3>Registro de Sesión</h3>";
sessionHTML += "<ul>";
if (sessionData) {
  const estudiantes = JSON.parse(sessionData);
  estudiantes.forEach((estudiante) => {
    sessionHTML += `<li><strong>${estudiante.nombre}</strong> | <strong>Promedio:</strong> ${estudiante.promedio}</li>`;
  });
}
sessionHTML += "</ul>";
// Mostrar contenido del Session Storage
sessionDataDiv.innerHTML = sessionHTML;


//LOCAL STORAGE Llamamiento de infromación
// Obtener los datos del Local Storage
const localData = localStorage.getItem("estudiantesHistorial");
// Generar contenido HTML para el Local Storage
let localHTML = "<h3>Registro Histórico</h3>";
localHTML += "<ul>";
if (localData) {
  const estudiantes = JSON.parse(localData);
  estudiantes.forEach((estudiante) => {
    localHTML += `<li><strong>${estudiante.nombre}</strong> | <strong>Promedio:</strong> ${estudiante.promedio} </li>`;
  });
}
localHTML += "</ul>";
// Mostrar contenido del Local Storage
localDataDiv.innerHTML = localHTML;


//PROMESAS (API's) Y LIBRERÍAS
//Llamamiento de API mediante Fetch y uso de librería
let intervalId;
const droppingQuotes = () => {
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

//Disparador de citas motivacionales en Inglés
quotesShooter.addEventListener("click", () => {
  intervalId = setInterval(droppingQuotes, 9000);
});
//Función de corte de las citas
quotesStopper.addEventListener("click", () => {
  clearInterval(intervalId);
});


//FILTRADO DE INFORMACIÓN
// Función para filtrar y mostrar los datos del Local Storage y Session Storage
function filtrarData(event) {
  event.preventDefault();
  const filtro = event.target.textContent;

  // Obtener los datos
  const localData = localStorage.getItem("estudiantesHistorial");
  const sessionData = sessionStorage.getItem("estudiantesSession");

  // Generar contenido HTML filtrado para el Local Storage
  let localHTML = "<h3>Registro Histórico</h3>";
  localHTML += "<ul>";

  // Generar contenido HTML filtrado para el Session Storage
  let sessionHTML = "<h3>Registro de Sesión</h3>";
  sessionHTML += "<ul>";

  if (localData) {
    const estudiantesLocal = JSON.parse(localData);
    const estudiantesSession = sessionData ? JSON.parse(sessionData) : [];

    // Filtrar y ordenar estudiantes según el criterio seleccionado
    let estudiantesLocalFiltrados;
    let estudiantesSessionFiltrados;

    if (filtro === "Por promedios (mejores notas a peores notas)") {
      estudiantesLocalFiltrados = estudiantesLocal.sort((a, b) => b.promedio - a.promedio);
      estudiantesSessionFiltrados = estudiantesSession.sort((a, b) => b.promedio - a.promedio);
    } else if (filtro === "Por promedios (peores notas a mejores notas)") {
      estudiantesLocalFiltrados = estudiantesLocal.sort((a, b) => a.promedio - b.promedio);
      estudiantesSessionFiltrados = estudiantesSession.sort((a, b) => a.promedio - b.promedio);
    }

    estudiantesLocalFiltrados.forEach((estudiante) => {
      localHTML += `<li><strong>${estudiante.nombre}</strong> | <strong>Promedio:</strong> ${estudiante.promedio}</li>`;
    });

    estudiantesSessionFiltrados.forEach((estudiante) => {
      sessionHTML += `<li><strong>${estudiante.nombre}</strong> | <strong>Promedio:</strong> ${estudiante.promedio}</li>`;
    });
  }

  localHTML += "</ul>";
  sessionHTML += "</ul>";

  // Mostrar contenido filtrado
  localDataDiv.innerHTML = localHTML;
  sessionDataDiv.innerHTML = sessionHTML;
}

ordenarMejoresBtn.addEventListener("click", filtrarData);
ordenarPeoresBtn.addEventListener("click", filtrarData);