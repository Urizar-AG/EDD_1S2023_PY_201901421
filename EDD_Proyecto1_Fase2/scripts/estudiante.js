import { AVL } from "../Estructuras/ArbolAVL.js";
import { NAryTree } from "../Estructuras/ArbolNArio.js";
import { CircularLinkedList } from "../Estructuras/ListaCircular.js";
import { CircularJSON } from "./circular-json.js";
import { sparseMatrix } from "../Estructuras/MatrizDispersa.js";

//Recupera los datos de localStorage del árbol y los almacena
let avl = null
if (localStorage.getItem("ArbolAVL") !== null) {
    avl = new AVL()
    avl.root = CircularJSON.parse(JSON.parse(localStorage.getItem("ArbolAVL")))
}

/*--------------------- Recupera el alumno que está en sesión ---------------------*/
let usuario = avl.getById(avl.root, Number(localStorage.getItem('usuarioEnSesion')))

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
            imprimir(res)
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
        if (res !== null) {
            usuario.folders = carpetas
            localStorage.setItem("ArbolAVL", JSON.stringify(CircularJSON.stringify(avl.root)))
            registrarActividad(res, "crear", "carpeta")
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
            localStorage.setItem("ArbolAVL", JSON.stringify(CircularJSON.stringify(avl.root)))
            registrarActividad(nombreCarpeta.value, "eliminar", "carpeta")
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
    let bitacora = new CircularLinkedList()
    bitacora.head = usuario.activityLogs.head
    bitacora.last = usuario.activityLogs.last
    if (bitacora.head !== null) {
        window.open ('reporteBitacora.html', "_newtab" ); 
    }else {
        alert('La bitácora está vacía, no hay nada que reportar')
    }
})

/*--------------------- Carga De Archivos ---------------------*/
const btnCargarArchivos = document.getElementById('cargar-archivos')
btnCargarArchivos.addEventListener('click', cargarArchivos)

function cargarArchivos() {
    const directorio = document.getElementById('directorio')
    let files = document.getElementById('input-files').files //Obtiene los archivos
    if (directorio.value.trim() !== "" && files.length > 0) {
        //Recupera la carpeta
        let carpetas = new NAryTree()
        carpetas.root = usuario.folders.root
        carpetas.total = usuario.folders.total
        let res = carpetas.getDir(directorio.value)

        if (res) {
            try {
                for (let i = 0; i < files.length; i++) {
                    //Obtiene el nombre del archivo y su extensión
                    let name = files[i].name 
                    let extension = name.split('.')[1]

                    let fr = new FileReader();
                    //Es un archivo txt, se lee normal
                    if (extension === 'txt') {
                        fr.readAsText(files[i])
                    }
                    //Es un archivo pdf o imagen, se convierte a base64
                    else {
                        fr.readAsDataURL(files[i])
                    }
                    fr.addEventListener('load', () => {
                        let archivos = new sparseMatrix("Root")
                        archivos.root = res.files.root
                        archivos.x = res.files.x
                        archivos.y = res.files.y

                        let archivo = archivos.addFile(name, 1)
                        if (archivo !== null) {
                            //Obtiene el archivo recien agregado, para agregar el contenido del archivo
                            archivo = archivos.getRow(archivo)
                            archivo.value = fr.result
                            
                            res.files.x = archivos.x
                            res.files.y = archivos.y
                            registrarActividad(archivo.name, "crear", "archivo")
                        }
                        usuario.folders = carpetas
                        localStorage.setItem('ArbolAVL', JSON.stringify(CircularJSON.stringify(avl.root)))
                        imprimir(res)
                    });
                }                
            } catch (error) {
                console.log("Ocurrio un error try/catch", error)
            }
        }else {
            alert("No fue posible acceder a la ruta especificada")
        }
        document.getElementById('input-files').value = null
    }else {
        alert('La barra de direcciones está vacía o no hay ningun archivo seleccionado para cargar')
    }
}

/*--------------------- Muestra las carpetas y archivos en la interfaz gráfica ---------------------*/
function imprimir(carpeta) {
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

    //Agrega los archivos de la carpeta
    let aux = ""
    let tmp2 = carpeta.files.root.down
    while (tmp2) {
        card = document.createElement('div')
        card.className += "card";
        icono = document.createElement('div')
        //concatena las clases
        aux = tmp2.name.split('.')
        if (aux[1] === "txt") {
            icono.className += 'fa-regular';
            icono.className += " fa-file-lines";
            icono.className += " fa-2xl";
        }else if (aux[1] === "pdf") {
            icono.className += 'fa-regular';
            icono.className += " fa-file-pdf";
            icono.className += " fa-2xl";
        }else {
            icono.className += 'fa-regular';
            icono.className += " fa-file-image";
            icono.className += " fa-2xl";
        }
        card.appendChild(icono)
        card.innerHTML += tmp2.name
        document.getElementById('main').appendChild(card)
        tmp2 = tmp2.down       
    }
}

/*--------------------- Registra en la bitácora ---------------------*/
function registrarActividad(name, tipo, tipo2) {
    //name -> nombre de la carpeta
    //tipo -> si la carpeta se creo o se elimino; crear, eliminar
    //tipo2 -> si es una carpeta o un archivo

    //Recupera la bitácora del estudiante
    let bitacora = new CircularLinkedList()
    bitacora.head = usuario.activityLogs.head
    bitacora.last = usuario.activityLogs.last

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

    if(tipo2 === "carpeta") {
        if (tipo === 'crear') {
            actividad = "Se creo la carpeta \\\"" + name + "\\\""
            bitacora.add(actividad, fecha, hora)
        }else {
            actividad = "Se elimino la carpeta \\\"" + name + "\\\""
            bitacora.add(actividad, fecha, hora)
        }
    }else {
        actividad = "Se creo el archivo \\\"" + name + "\\\""
        bitacora.add(actividad, fecha, hora)
    }

    usuario.activityLogs = bitacora
    localStorage.setItem('ArbolAVL', JSON.stringify(CircularJSON.stringify(avl.root)))
}
