import { AVL } from "../Estructuras/ArbolAVL.js";
import { CircularJSON } from "./circular-json.js";

const body = document.querySelector('body')
body.onload = generarImagen

function generarImagen() {
    let url = 'https://quickchart.io/graphviz?graph=';
    let avl = new AVL()
    avl.root = CircularJSON.parse(JSON.parse(localStorage.getItem('ArbolAVL')))
    let cadena = avl.getDot()
    document.getElementById('arbol').src = url + cadena
}
