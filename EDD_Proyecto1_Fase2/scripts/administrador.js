import { AVL } from "../Estructuras/ArbolAVL.js";

let avl = null
if (localStorage.getItem("ArbolAVL") != null) {
    avl = new AVL()
    avl.root = JSON.parse(localStorage.getItem("ArbolAVL"))
}

const body = document.querySelector('body')
body.onload = llenarTabla()

const btnLogout = document.getElementById('logout')
btnLogout.addEventListener("click",  (e) => {
    window.location.href = "../index.html";
})

const btnVerAlumnos = document.getElementById('ver-alumnos')
btnVerAlumnos.addEventListener('click', llenarTabla)

const bntVerArbol = document.getElementById('ver-arbol')
bntVerArbol.addEventListener('click', (e) => {
    if (avl != null) {
        window.location.href = "reporteAVL.html";
    }else {
        alert("No hay alumnos registrados en el sistema")
    }
})

const btnCargaMasiva = document.getElementById('carga-masiva')
btnCargaMasiva.addEventListener('click', cargaMasiva)

function llenarTabla() {
    let userSelection = document.getElementById('recorrido').value //Valor del selector
    document.getElementById('body-table').innerHTML = ""
    if (avl != null) {
        if (userSelection === "inorden") {
            inorden(avl.root)
        }else if(userSelection === "preorden") {
            preorden(avl.root)
        }else if(userSelection === "postorden") {
            postorden(avl.root)
        } 
    }
}

function cargaMasiva() {
    let file = document.getElementById('input-file').files[0] //Obtiene el contenido del input
    if (file) {
        let fr = new FileReader();
        fr.readAsText(file); 

        fr.addEventListener("load", () => {
            avl = new AVL();
            //Recorre el localStorage para recuperar los datos ya almacenados en el sistema y los agrega al árbol
            if (localStorage.getItem("ArbolAVL") != null) {
                avl.root = JSON.parse(localStorage.getItem("ArbolAVL"))
            }

            let data = JSON.parse(fr.result)
            data = data.alumnos
            //Recorre el arreglo y agrega la información al árbol
            for (let i = 0; i < data.length; i++) {
                avl.add(data[i].nombre, data[i].carnet, data[i].password, data[i].Carpeta_Raiz)

            }
            localStorage.setItem("ArbolAVL", JSON.stringify(avl.root))

            llenarTabla()
        })
        
        //Limpia el input, eliminando el archivo del input
        document.getElementById('input-file').value= null
    }else {
        alert("Asegurate de seleccionar un archivo")
    }
}

function inorden(node) {
    if (node != null) {
        inorden(node.left);
        const tr = document.createElement('tr')
        const td1 = tr.appendChild(document.createElement('td'))
        const td2 = tr.appendChild(document.createElement('td'))
        td1.innerHTML = node.name
        td2.innerHTML = node.carnet
        document.getElementById('body-table').appendChild(tr)
        inorden(node.right)
    }
}

function preorden(node) {
    if (node != null) {
        const tr = document.createElement('tr')
        const td1 = tr.appendChild(document.createElement('td'))
        const td2 = tr.appendChild(document.createElement('td'))
        td1.innerHTML = node.name
        td2.innerHTML = node.carnet
        document.getElementById('body-table').appendChild(tr)
        preorden(node.left)
        preorden(node.right)      
    }
}

function postorden(node) {
    if (node != null) {
        postorden(node.left)
        postorden(node.right) 
        const tr = document.createElement('tr')
        const td1 = tr.appendChild(document.createElement('td'))
        const td2 = tr.appendChild(document.createElement('td'))
        td1.innerHTML = node.name
        td2.innerHTML = node.carnet
        document.getElementById('body-table').appendChild(tr) 
    }
}
