import { AVL } from "../Estructuras/ArbolAVL.js";
import { NAryTree } from "../Estructuras/ArbolNArio.js";
import { CircularJSON } from "./circular-json.js";

const body = document.querySelector('body')
body.onload = generarImagen

function generarImagen() {
    let url = 'https://quickchart.io/graphviz?graph=';
    let avl = new AVL()
    avl.root = CircularJSON.parse(JSON.parse(localStorage.getItem('ArbolAVL')))
    let usuario = avl.getById(avl.root, Number(localStorage.getItem('usuarioEnSesion')))
    let carpetas = new NAryTree()
    carpetas.root = usuario.folders.root
    carpetas.total = usuario.folders.total
    let cadena = carpetas.getDot()
    document.getElementById('arbol').src = url + cadena
}
