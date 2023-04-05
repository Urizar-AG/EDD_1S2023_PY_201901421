import { AVL } from "../Estructuras/ArbolAVL.js";
import { CircularLinkedList } from "../Estructuras/ListaCircular.js";
import { CircularJSON } from "./circular-json.js";

const body = document.querySelector('body')
body.onload = generarImagen

function generarImagen() {
    let url = 'https://quickchart.io/graphviz?graph=';
    let avl = new AVL()
    avl.root = CircularJSON.parse(JSON.parse(localStorage.getItem('ArbolAVL')))
    let usuario = avl.getById(avl.root, Number(localStorage.getItem('usuarioEnSesion')))
    let bitacora = new CircularLinkedList()
    bitacora.head = usuario.activityLogs.head
    bitacora.last = usuario.activityLogs.last
    let cadena = bitacora.writeDot()
    document.getElementById('bitacora').src = url + cadena
}