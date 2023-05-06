import { HashTable } from "../Estructuras/TablaHash.js";
// import { NAryTree } from "../Estructuras/ArbolNArio.js";
import { CircularJSON } from "./circular-json.js";
// import { sparseMatrix } from "../Estructuras/MatrizDispersa.js";

let tablaHash = null
if (localStorage.getItem("TablaHash-Arreglo") !== null) {
    tablaHash = new HashTable;
    tablaHash.table = CircularJSON.parse(JSON.parse(localStorage.getItem("TablaHash-Arreglo")));
    tablaHash.capacity = CircularJSON.parse(JSON.parse(localStorage.getItem("TablaHash-Capacidad")));
    tablaHash.used = CircularJSON.parse(JSON.parse(localStorage.getItem("TablaHash-Ocupado")));
}

/*--------------------- Recupera el alumno que está en sesión ---------------------*/
let usuario = tablaHash.getUser(Number(localStorage.getItem('UsuarioEnSesion')));

/*--------------------- Ocultar la barra lateral de la interfaz gráfica ---------------------*/
const side = document.querySelector('.side');
let btnOcultar = document.getElementById('ocultar')
btnOcultar.addEventListener('click', () => {
    side.classList.toggle('closed');
})

/*--------------------- Cerrar Sesión ---------------------*/
const btnLogout = document.getElementById('logout')
btnLogout.addEventListener("click",  (e) => {
    localStorage.removeItem('UsuarioEnSesion');
    window.location.href = "../index.html";
});

/*--------------------- Pestaña de mensajería ---------------------*/
const btnMensajeria = document.getElementById('mensajeria');
btnMensajeria.addEventListener("click",  (e) => {
    window.open ('mensajeria.html', "_newtab"); 
});

