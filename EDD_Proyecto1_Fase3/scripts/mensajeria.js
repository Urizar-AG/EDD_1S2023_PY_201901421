import { NodeBlock } from "../Estructuras/BlockChain.js";
import { BlockChain } from "../Estructuras/BlockChain.js";
import { HashTable } from "../Estructuras/TablaHash.js";
import { CircularJSON } from "./circular-json.js";

let usuario = localStorage.getItem('UsuarioEnSesion');
let receptor =  ""; //Guarda el número de carnet con el estudiane que se está chateando
let contactos = []; //Guarda el número de carnet de los chats del usuario loggeado

let tablaHash = null;
if (localStorage.getItem("TablaHash-Arreglo") !== null) {
    tablaHash = new HashTable();
    tablaHash.table = CircularJSON.parse(JSON.parse(localStorage.getItem("TablaHash-Arreglo")));
    tablaHash.capacity = CircularJSON.parse(JSON.parse(localStorage.getItem("TablaHash-Capacidad")));
    tablaHash.used = CircularJSON.parse(JSON.parse(localStorage.getItem("TablaHash-Ocupado")));
}

let blockChain = null;
if (localStorage.getItem("BlockChain-Primero") !== null) {
    blockChain = new BlockChain();
    blockChain.first = CircularJSON.parse(JSON.parse(localStorage.getItem('BlockChain-Primero')));
    blockChain.blocksCreated = CircularJSON.parse(JSON.parse(localStorage.getItem('BlockChain-Cantidad-Bloques')));
}

const body = document.querySelector('body')
body.onload = imprimirContactos();

const btnBuscarEstudiante = document.getElementById('buscar-estudiante');
btnBuscarEstudiante.addEventListener('click', buscarEstudiante);
/*--------------------- Busca un estudiante y lo agrega a la lista de chats ---------------------*/
function buscarEstudiante() {
    const student = document.getElementById('buscador').value; //Recupera el número de carnet del estudiante a buscar
    if (!(contactos.includes(student))) {
        const estudiante = tablaHash.getUser(student);
        if (estudiante) {
            agregarContacto(student);
            contactos.push(student);
        }else {
            alert('El carnet ingresado no existe en el sistema');
        }
    }else {
        alert(`${student} ya está en tu lista de contactos`);
    }
    document.getElementById('buscador').value = "";
}

/*--------------------- Busca los chats (carnets con los que ha hablado) el usuario loggeado ---------------------*/
function imprimirContactos() {

    let tmp = blockChain.first;
    //Recorrre la block chain para llenar el array de contactos
    while(tmp) {
        //El emisor es el usuario loggeado
        if (Number(usuario) === Number(tmp.value.transmitter)) {
            //El receptor aún no está en la lista
            if (!contactos.includes(tmp.value.receiver)) {
                contactos.push(tmp.value.receiver);
            }
        } 
        //El emisor es otro usuario y el receptor es el usuario loggeado
        else if(Number(usuario) === Number(tmp.value.receiver) ){
            //El usuario emisor no está en la lista de contactos del usuario loggeado
            if (!contactos.includes(tmp.value.transmitter)) {
                contactos.push(tmp.value.transmitter);
            }
        }
        tmp = tmp.next;
    }    

    //Agrega el html de los contactos a la vista de mensajería
    for (const estudiante of contactos) {
        agregarContacto(estudiante);
    }
}

/*--------------------- Agrega el contacto al html ---------------------*/
function agregarContacto(carnet) {
    let li = document.createElement('li');
    li.innerHTML = carnet;
    li.setAttribute('id', carnet);
    li.addEventListener('click', function (event) {
        let li = event.target;
        
        receptor = li.id;
        //Limpia el área de chat
        document.getElementById('chats').innerHTML = "";
        document.getElementById('user-input').innerHTML = "";
        //Agrega complementos del chat
        complementosChat(li.id);

        let tmp = new NodeBlock(0, 0, "sistema", "sistema", "creado por el sistema", 0, 0);
        tmp = blockChain.first;
        //Recorre agregando al html los mensajes entre el usuario loggeado y el receptor del mensaje
        while (tmp) {
            if (Number(usuario) === Number(tmp.value.transmitter) && Number(li.id) === Number(tmp.value.receiver)) {
                let globo = document.createElement('div');
                globo.setAttribute('class', 'message outgoing');
                const parrafo = document.createElement('p');
                let mensaje = CryptoJS.AES.decrypt(tmp.value.message, "EDD-2023").toString(CryptoJS.enc.Utf8);
                parrafo.innerHTML = mensaje;
                globo.appendChild(parrafo);
                document.getElementById('chats').appendChild(globo);
            } else if(Number(li.id) === Number(tmp.value.transmitter) && Number(usuario) === Number(tmp.value.receiver) ){
                let globo = document.createElement('div');
                globo.setAttribute('class', 'message incoming');
                const parrafo = document.createElement('p');
                let mensaje = CryptoJS.AES.decrypt(tmp.value.message, "EDD-2023").toString(CryptoJS.enc.Utf8);
                parrafo.innerHTML = mensaje;
                globo.appendChild(parrafo);
                document.getElementById('chats').appendChild(globo);
            }
            tmp = tmp.next;
        }
    });
    document.getElementById('chat').appendChild(li);
}

/*--------------------- Agrega los elementos al área del chat cuando se abre un chat ---------------------*/
function complementosChat(id){
    //Agrega con que persona se está chateando
    let mensajeCarnet = document.createElement('div');
    mensajeCarnet.setAttribute('class', 'user-join');
    const texto = document.createElement('p');
    texto.innerHTML = id + "";
    mensajeCarnet.appendChild(texto);
    document.getElementById('chats').appendChild(mensajeCarnet);

    //Crea el mensaje de user join
    let mensajeJoin = document.createElement('div');
    mensajeJoin.setAttribute('class', 'user-join');
    const parrafo = document.createElement('p');
    parrafo.innerHTML = `Los mensajes enviados a este contacto están cifrados.<br>Nadie fuera de este chat puede leerlos.`;
    mensajeJoin.appendChild(parrafo);
    document.getElementById('chats').appendChild(mensajeJoin);
    
    //Agrega la barra para escribir mensaje y botón de envío
    let areaTexto = document.createElement('textarea');
    areaTexto.setAttribute('id', 'message');
    areaTexto.setAttribute('cols', '30');
    areaTexto.setAttribute('rows', '1');
    areaTexto.setAttribute('placeholder', 'Mensaje');
    let btn = document.createElement('button');
    btn.setAttribute('id', 'send-message');
    btn.addEventListener('click', sendMessage);
    btn.innerHTML = "Enviar";
    document.getElementById('user-input').appendChild(areaTexto);
    document.getElementById('user-input').appendChild(btn);
}

/*--------------------- Envia el mensaje  y lo agrega a la BlockChain ---------------------*/
async function sendMessage() {
    let mensaje = document.getElementById('message').value;
    let globo = document.createElement('div');
    globo.setAttribute('class', 'message outgoing');
    const parrafo = document.createElement('p');
    parrafo.innerHTML = mensaje;
    globo.appendChild(parrafo);
    document.getElementById('chats').appendChild(globo);
    document.getElementById('message').value = ""; 
    let encrypted = CryptoJS.AES.encrypt(mensaje, "EDD-2023");
    await blockChain.addBlock(fechaActual(), usuario, receptor, encrypted); 
    //Actualiza la block chain en el localStorage 
    localStorage.setItem("BlockChain-Primero", JSON.stringify(CircularJSON.stringify(blockChain.first)));
    localStorage.setItem("BlockChain-Cantidad-Bloques", JSON.stringify(CircularJSON.stringify(blockChain.blocksCreated)));
}

//Obtiene la fecha actual y la formatea para el timeStamp de la block chain
function fechaActual(){
    let fecha = ""
    const fechaActual = new Date();
    fecha += fechaActual.getDate() < 10 ? ("0"+fechaActual.getDate()+"-") : (fechaActual.getDate()+"-");
    fecha += fechaActual.getMonth() < 10 ? ("0"+(fechaActual.getMonth()+1)+"-") : (fechaActual.getMonth()+"-");
    fecha += fechaActual.getFullYear() + "::";
    fecha += fechaActual.getHours() < 10 ? ("0"+fechaActual.getHours()+":") : (fechaActual.getHours()+":");
    fecha += fechaActual.getMinutes() < 10 ? ("0"+fechaActual.getMinutes()+":") : (fechaActual.getMinutes()+":");
    fecha += fechaActual.getSeconds() < 10 ? ("0"+fechaActual.getSeconds()) : (fechaActual.getSeconds());
    return fecha;
}
