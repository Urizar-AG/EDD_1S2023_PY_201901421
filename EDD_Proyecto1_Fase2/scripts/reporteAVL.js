import { AVL } from "../Estructuras/ArbolAVL.js";

const body = document.querySelector('body')
body.onload = generarImagen

function generarImagen() {
    let url = 'https://quickchart.io/graphviz?graph=';
    let avl = new AVL()
    avl.root = JSON.parse(localStorage.getItem('ArbolAVL'))
    let cadena = avl.getDot()
    document.getElementById('arbol').src = url + cadena
}
