import { HashTable } from "../Estructuras/TablaHash.js";
import { CircularJSON } from "./circular-json.js";

let tablaHash = null
if (localStorage.getItem("ArbolAVL") != null) {
    tablaHash = new HashTable();
    tablaHash.table = CircularJSON.parse(JSON.parse(localStorage.getItem("TablaHash-Arreglo")));
    tablaHash.capacity = CircularJSON.parse(JSON.parse(localStorage.getItem("TablaHash-Capacidad")));
    tablaHash.used = CircularJSON.parse(JSON.parse(localStorage.getItem("TablaHash-Ocupado")));
}

const body = document.querySelector('body')
body.onload = llenarTablaUsuarios()

/*--------------------- Ocultar la barra lateral de la interfaz gráfica ---------------------*/
const side = document.querySelector('.side');
let btnOcultar = document.getElementById('ocultar')
btnOcultar.addEventListener('click', () => {
    side.classList.toggle('closed');
});

/*--------------------- Cerrar Sesión ---------------------*/
const btnLogout = document.getElementById('logout')
btnLogout.addEventListener("click",  (e) => {
    window.location.href = "../index.html";
});

//Llena la tabla con los usuarios registrados en el sistema
function llenarTablaUsuarios() {
    for (const estudiante of tablaHash.table) {
        if(estudiante) { //Si la posición de la tabla no está vacía
            const tr = document.createElement('tr');
            const td1 = tr.appendChild(document.createElement('td'));
            const td2 = tr.appendChild(document.createElement('td'));
            const td3 = tr.appendChild(document.createElement('td'));
            td1.innerHTML = estudiante.carnet;
            td2.innerHTML = estudiante.name;
            td3.innerHTML = estudiante.password;
            document.getElementById('body-table').appendChild(tr);   
        }
    }
}

