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
}
