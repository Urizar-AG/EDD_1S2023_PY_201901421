import { BlockChain } from "../Estructuras/BlockChain.js";
import { CircularJSON } from "./circular-json.js";

let blockChain = null;
if (localStorage.getItem("BlockChain-Primero") !== null) {
    blockChain = new BlockChain();
    blockChain.first = CircularJSON.parse(JSON.parse(localStorage.getItem('BlockChain-Primero')));
    blockChain.blocksCreated = CircularJSON.parse(JSON.parse(localStorage.getItem('BlockChain-Cantidad-Bloques')));
}

let currentBlock = null; //Bloque que el usuario está visualizando
const body = document.querySelector('body');
body.onload = cargarBloque();

function cargarBloque() {
    currentBlock = blockChain.first;
    if(currentBlock !== null){
        let cadena = "Index: " + currentBlock.value['index']
        cadena += "\nTimeStamp: " + currentBlock.value['timeStamp']
        cadena += "\nEmisor: " + currentBlock.value['transmitter']
        cadena += "\nReceptor: " + currentBlock.value['receiver']
        cadena += "\nMensaje: " + currentBlock.value['message']
        cadena += "\nPreviousHash: " + currentBlock.value['previousHash']
        cadena += "\nHash: " + currentBlock.value['hash']
        document.getElementById("data-container").value = cadena
    }
}

const btnPrev = document.getElementById('btn-prev');
btnPrev.addEventListener('click', cargarBloqueAnterior);
function cargarBloqueAnterior() {
    if(currentBlock.prev !== null){
        currentBlock = currentBlock.prev
        let cadena = "Index: " + currentBlock.value['index']
        cadena += "\nTimeStamp: " + currentBlock.value['timeStamp']
        cadena += "\nEmisor: " + currentBlock.value['transmitter']
        cadena += "\nReceptor: " + currentBlock.value['receiver']
        cadena += "\nMensaje: " + currentBlock.value['message']
        cadena += "\nPreviousHash: " + currentBlock.value['previousHash']
        cadena += "\nHash: " + currentBlock.value['hash']
        document.getElementById("data-container").value = cadena;
    }else {
        alert('Estás en el primer bloque');
    }
}

const btnNext = document.getElementById('btn-next');
btnNext.addEventListener('click', cargarBloqueSiguiente);
function cargarBloqueSiguiente() {
    if(currentBlock.next !== null){
        currentBlock = currentBlock.next;  
        let cadena = "Index: " + currentBlock.value['index']
        cadena += "\nTimeStamp: " + currentBlock.value['timeStamp']
        cadena += "\nEmisor: " + currentBlock.value['transmitter']
        cadena += "\nReceptor: " + currentBlock.value['receiver']
        cadena += "\nMensaje: " + currentBlock.value['message']
        cadena += "\nPreviousHash: " + currentBlock.value['previousHash']
        cadena += "\nHash: " + currentBlock.value['hash']
        document.getElementById("data-container").value = cadena;
    }else {
        alert('Estás en el último bloque');
    }
}
