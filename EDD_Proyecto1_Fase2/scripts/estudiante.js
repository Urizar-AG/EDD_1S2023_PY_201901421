import { AVL } from "../Estructuras/ArbolAVL.js";
import { NAryTree } from "../Estructuras/ArbolNArio.js";
import { CircularLinkedList } from "../Estructuras/ListaCircular.js";

//Recupera los datos de localStorage del árbol y los almacena
let avl = null
if (localStorage.getItem("ArbolAVL") !== null) {
    avl = new AVL()
    avl.root = JSON.parse(localStorage.getItem("ArbolAVL"))
}

/*--------------------- Recupera el alumno que está en sesión ---------------------*/
let usuario = avl.getById(avl.root, Number(localStorage.getItem('usuarioEnSesion')))
//Bitácora del usuario, existe solamente durante la sesión
let bitacora = new CircularLinkedList()
bitacora.head = usuario.activityLogs.head
bitacora.last = usuario.activityLogs.last

/*--------------------- Carga la carpeta raíz al cargar el body ---------------------*/
const body = document.querySelector('body')
body.onload = cargarCarptaRaiz()
function cargarCarptaRaiz() {
    document.getElementById('directorio').value = "/"
    buscarDirectorio()
}

/*--------------------- Ocultar la barra lateral de la interfaz gráfica ---------------------*/
const side = document.querySelector('.side');
let btnOcultar = document.getElementById('ocultar')
btnOcultar.addEventListener('click', () => {
    side.classList.toggle('closed');
})

/*--------------------- Cerrar Sesión ---------------------*/
const btnLogout = document.getElementById('logout')
btnLogout.addEventListener("click",  (e) => {
    localStorage.removeItem('usuarioEnSesion')
    localStorage.removeItem('actividadBitacora')
    window.location.href = "../index.html";
})

/*--------------------- Buscar Directorio ---------------------*/
const btnBuscar = document.getElementById('buscar')
btnBuscar.addEventListener('click', buscarDirectorio)

function buscarDirectorio() {
    const directorio = document.getElementById('directorio')
    if (directorio.value.trim() != "") {
        let carpetas = new NAryTree()
        carpetas.root = usuario.folders.root
        carpetas.total = usuario.folders.total
        let res = carpetas.getDir(directorio.value)
        if (res !== null) {
            console.log("Carpeta obtenida: ", res)
            imprimirCarpetas(res)
        }else {
            alert("No fue posible acceder a la ruta especificada")
        }
    }else {
        alert('La barra de direcciones está vacía')
    }
}

/*--------------------- Crear Carpeta ---------------------*/
const btnCrear = document.getElementById('crear-carpeta')
btnCrear.addEventListener('click', crearDirectorio)

function crearDirectorio() {
    const directorio = document.getElementById('directorio')
    const nombreCarpeta = document.getElementById('nombre-nueva-carpeta')
    if (nombreCarpeta.value.trim() != "" && directorio.value.trim() != "") {
        let carpetas = new NAryTree()
        carpetas.root = usuario.folders.root
        carpetas.total = usuario.folders.total
        let res = carpetas.add(directorio.value, nombreCarpeta.value)
        if (res) {
            usuario.folders = carpetas
            localStorage.setItem("ArbolAVL", JSON.stringify(avl.root))
            registrarActividad(nombreCarpeta.value, "crear")
            alert("Carpeta creada exitosamente")
            buscarDirectorio()
        }else {
            alert("No fue posible crear la carpeta")
        }
    }else {
        alert('La barra de direcciones y el nombre de la carpeta a crear no pueden estar vacíos')
    }
}

/*--------------------- Eliminar Carpeta ---------------------*/
const btnEliminar = document.getElementById('eliminar-carpeta')
btnEliminar.addEventListener('click', eliminarDirectorio)

function eliminarDirectorio() {
    const directorio = document.getElementById('directorio')
    const nombreCarpeta = document.getElementById('nombre-eliminar-carpeta')
    if (nombreCarpeta.value.trim() != "" && directorio.value.trim() != "") {
        let carpetas = new NAryTree()
        carpetas.root = usuario.folders.root
        carpetas.total = usuario.folders.total
        let res = carpetas.removeDir(directorio.value, nombreCarpeta.value)
        if (res) {
            usuario.folders = carpetas
            localStorage.setItem("ArbolAVL", JSON.stringify(avl.root))
            registrarActividad(nombreCarpeta.value, "eliminar")
            alert("Carpeta eliminada exitosamente")
            buscarDirectorio()
        }else {
            alert("No fue posible eliminar la carpeta")
        }
    }else {
        alert('La barra de direcciones y el nombre de la carpeta a eliminar no pueden estar vacíos')
    }
}

/*--------------------- Reporte De Las Carpetas ---------------------*/
const btnReporteCarpetas = document.getElementById('reporte-carpetas')
btnReporteCarpetas.addEventListener('click', () => {
    window.open ('reporteNArio.html', "_newtab" ); 
})

/*--------------------- Reporte De Bitácora ---------------------*/
const btnReporteBitacora = document.getElementById('reporte-bitacora')
btnReporteBitacora.addEventListener('click', () => {
    if (bitacora.head !== null) {
        let cadena = ""
        cadena = bitacora.writeDot()
        //Almacena el dot en en localStorage para recuperarlo en la página del reporte
        localStorage.setItem('actividadBitacora', cadena)
        window.open ('reporteBitacora.html', "_newtab" ); 
    }else {
        alert('La bitácora está vacía, no hay nada que reportar')
    }
})

/*--------------------- Muestra las carpetas en la interfaz gráfica ---------------------*/
function imprimirCarpetas(carpeta) {
    //Agrega las carpetas
    document.getElementById('main').innerHTML = ""
    let card = null
    let icono = null
    let tmp = carpeta.first
    while (tmp) {
        card = document.createElement('div')
        card.className += "card";
        icono = document.createElement('div')
        //concatena las clases
        icono.className += 'fa-regular';
        icono.className += " fa-folder";
        icono.className += " fa-2xl";

        card.appendChild(icono)
        card.innerHTML += tmp.name
        document.getElementById('main').appendChild(card)
        tmp = tmp.next
    }
}

/*--------------------- Registra en la bitácora ---------------------*/
function registrarActividad(name, tipo) {
    //name -> nombre de la carpeta
    //tipo -> si la carpeta se creo o se elimino; crear, eliminar
    let actividad = ""
    let fecha = ""
    let hora = ""
    //Recupera la fecha de la pc
    let now = new Date()
    let fechaHora = now.toLocaleString("gt-GT", {
        day:"2-digit", 
        month:"2-digit", 
        year:"numeric", 
        hour:"2-digit", 
        minute:"2-digit", 
        second:"2-digit", 
        hour12:true, 
        hourCycle:'h12'
    });
    fechaHora = fechaHora.split(',')
    fecha = fechaHora[0]
    hora = fechaHora[1]

    if (tipo === 'crear') {
        actividad = "Se creo la carpeta " + name
        bitacora.add(actividad, fecha, hora)
    }else {
        actividad = "Se elimino la carpeta " + name
        bitacora.add(actividad, fecha, hora)
    }
}
