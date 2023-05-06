import { BlockChain } from "../Estructuras/BlockChain.js";
import { CircularJSON } from "./circular-json.js";

let blockChain = null;
if (localStorage.getItem("BlockChain-Primero") !== null) {
    blockChain = new BlockChain();
    blockChain.first = CircularJSON.parse(JSON.parse(localStorage.getItem('BlockChain-Primero')));
    blockChain.blocksCreated = CircularJSON.parse(JSON.parse(localStorage.getItem('BlockChain-Cantidad-Bloques')));
}


const body = document.querySelector('body')
body.onload = generarImagen

function generarImagen() {
    let url = 'https://quickchart.io/graphviz?graph=';
    let cadena = blockChain.getDot();
    document.getElementById('blockchain').src = url + cadena;
    // localStorage.removeItem('dotArchivos')
}
