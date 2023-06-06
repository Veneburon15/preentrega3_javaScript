//REFRESH DEFAULT
window.addEventListener("load", () => {
    let inputs = document.querySelectorAll("#table__students input");
    inputs.forEach((input) => (input.value = ""));
});

//CONSTANTES
const add_student = document.getElementById("table__add-student");
const table = document.getElementById("table__students");
const session_button = document.getElementById("btn-session");
const local_button = document.getElementById("btn-local");
const regex = /^[a-zA-Z\s]+$/;

//ARREGLO PRINCIPAL
let estudiantesSession = obtenerEstudiantesSessionHistorial();
let estudiantesHistorial = obtenerEstudiantesHistorial();

//CLASE ALUMNO
class Alumno {
    constructor (nombre, nota1, nota2, nota3){
        this.nombre = nombre;
        this.nota1 = nota1;
        this.nota2 = nota2;
        this.nota3 = nota3;
        this.promedio = this.calcularPromedio();
    }
    //Cálculo del promedio
    calcularPromedio(){
        let notas = [this.nota1, this.nota2, this.nota3];
        let promedio = notas.reduce((sum, nota) => sum + nota, 0) /notas.length;
        return promedio.toFixed(2);
    }
};

//EVENTOS
//Guardar en el sessionStorage
session_button.addEventListener("click", () => {
    sessionStorage.setItem("estudiantesSession", JSON.stringify(estudiantesSession));
})
//Guardar en el localStorage
local_button.addEventListener("click", () => {
    localStorage.setItem("estudiantesHistorial", JSON.stringify(estudiantesHistorial));
})
//Agregar fila de estudiante
add_student.addEventListener("click", () => {
    let row_creation = document.createElement("tr");
    row_creation.innerHTML = `
    <td><input type="text" placeholder="Nombre del alumno"></td>
    <td><input type="text" placeholder="Exámen 1"></td>
    <td><input type="text" placeholder="Exámen 2"></td>
    <td><input type="text" placeholder="Exámen 3"></td>
    <td class="promedium">Promedio</td>
    <td><button class="calc-button">Calcular promedio</button><td>
    `;
    table.append(row_creation);
});

//Asignar eventos a los botones de cálculo
table.addEventListener("click", (event) => {
    if (event.target.classList.contains("calc-button")){
        let currentRow = event.target.parentNode.parentNode;
        let inputs = currentRow.getElementsByTagName("input");
        let nombre = inputs[0].value;
        let nota1 = Number(inputs[1].value);
        let nota2 = Number(inputs[2].value);
        let nota3 = Number(inputs[3].value);

        if (!validarNombre(nombre)) {
            alert("Error: El nombre del alumno debe contener solo letras y espacios");
            return;
        }
        if (!validarNota(nota1) || !validarNota(nota2) || !validarNota(nota3)) {
            alert("Error: Las notas deben estar entre 0 y 20");
            return;
        }

        let alumno = new Alumno(nombre, nota1, nota2, nota3);
        storageSaving(alumno);
        let promedioCell = currentRow.getElementsByClassName("promedium")[0];
        promedioCell.innerText = alumno.promedio;
    }
})

//FUNCIONES
// Validar nombre
function validarNombre(nombre) {
    return regex.test(nombre);
}

// Validar nota
function validarNota(nota) {
    return !isNaN(nota) && nota >= 0 && nota <= 20;
}

// Obtener los datos del sessionStorage
function obtenerEstudiantesSessionHistorial(){
    const estudiantesHistorialJSON = sessionStorage.getItem("estudiantesSession");
    if (estudiantesHistorialJSON) {
        return JSON.parse(estudiantesHistorialJSON);
    }
    return[];
}

//Obtener los datos del localStorage
function obtenerEstudiantesHistorial(){
    const estudiantesHistorialJSON = localStorage.getItem("estudiantesHistorial");
    if (estudiantesHistorialJSON) {
        return JSON.parse(estudiantesHistorialJSON);
    }
    return[];
}

//Adición del alumno al localStorage
function storageSaving (alumno) {
    estudiantesSession.push(alumno);
    estudiantesHistorial.push(alumno);
    // // Ordenar los estudiantes por fecha (supongamos que tienes una propiedad "fecha" en cada estudiante)
    // estudiantesHistorial.sort((a, b) => {
    //     const dateA = new Date(a.fecha);
    //     const dateB = new Date(b.fecha);
    //     return dateA - dateB;
    // });
    //Ordenar los estudiantes por nombre
    // estudiantes.sort((a, b) => a.nombre.localeCompare(b.nombre));
}


// 




//
////////////


// //Devolución final de datos
// const OPCION_ALUMNOS = 1   
// const OPCION_ALUMNOS_PROMEDIOS = 2;
// const OPCION_ALUMNOS_INGRESADOS = 3;
// const OPCION_SALIR = 4;

// switch (mostrarMenu()) {
//     case OPCION_ALUMNOS: 
//         namesDev();
//         break;
//     case OPCION_ALUMNOS_PROMEDIOS:
//         namesProm();
//         break;
//     case OPCION_ALUMNOS_INGRESADOS:
//       showData();
//       break;
//     case OPCION_SALIR:
//       alert("Saliendo del programa");
//       break;
//     default:
//       alert("Opción inválida");
//       break;
// };

// //FUNCIONES DEL SWITCH
// //CICLO PRINCIPAL
// function mostrarMenu() {
//     let opcion = 0;
//     while (opcion < OPCION_ALUMNOS || opcion > OPCION_SALIR){
//         opcion = Number(prompt(`Ingrese una opción:
//         ${OPCION_ALUMNOS}. Mostrar nombres de los alumnos ingresados
//         ${OPCION_ALUMNOS_PROMEDIOS}. Mostrar nombres de los alumnos y sus promedios
//         ${OPCION_ALUMNOS_INGRESADOS}. Datos de todos los alumnos ingresados
//         ${OPCION_SALIR}. Salir`));
//     };
//     return opcion;
//   }

// //FUNCIONES DE DEVOLUCIÓN
// //Devolución de nombres
// function namesDev(){
//     let mensaje = estudiantes.map(estudiante => estudiante.nombre).join("\n");
//     alert(mensaje);
// };

// //Devolución de nombres y promedios
// function namesProm(){
//     let mensaje = estudiantes.map(estudiante => estudiante.nombre + " ---- " + estudiante.promedio).join("\n");
//     alert(mensaje);
// };

// //Devolucion de cada estudiante
// function showData(){
//     let mensaje = "";
//     for (let i = 0; i < estudiantes.length; i++) {
//         mensaje += "Estudiante #" + (i + 1) + ":\n" +
//                    "Nombre: " + estudiantes[i].nombre + "\n" +
//                    "Nota 1: " + estudiantes[i].nota1 + "\n" +
//                    "Nota 2: " + estudiantes[i].nota2 + "\n" +
//                    "Nota 3: " + estudiantes[i].nota3 + "\n" +
//                    "Promedio: " + estudiantes[i].promedio + "\n\n";
//     };
//     alert(mensaje);
// };

