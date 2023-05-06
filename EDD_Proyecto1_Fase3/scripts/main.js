import { AVL } from "../Estructuras/ArbolAVL.js";
import { CircularJSON } from "./circular-json.js";
import { NodeHash, HashTable } from "../Estructuras/TablaHash.js";
import { NodeBlock, BlockChain } from "../Estructuras/BlockChain.js";

let avl = null
let tablaHash = null;
//Si la tabla aún no existe en el localStorage, recupera el árbol y pasa la información a la tabla
if (localStorage.getItem("ArbolAVL") !== null && localStorage.getItem("TablaHash-Arreglo") === null) {
    avl = new AVL()
    avl.root = CircularJSON.parse(JSON.parse(localStorage.getItem("ArbolAVL")));
    tablaHash = new HashTable();
    await transferirData(avl.root);
    localStorage.setItem("TablaHash-Arreglo", JSON.stringify(CircularJSON.stringify(tablaHash.table))); //Atributo "table"
    localStorage.setItem("TablaHash-Capacidad", JSON.stringify(CircularJSON.stringify(tablaHash.capacity))); //Atributo "capacity"
    localStorage.setItem("TablaHash-Ocupado", JSON.stringify(CircularJSON.stringify(tablaHash.used))); //Atributo "used"
}

//La tabla ya existe, entonces solo recupera la información del localStorage
if (localStorage.getItem("TablaHash-Arreglo") !== null) {
    tablaHash = new HashTable();
    tablaHash.table = CircularJSON.parse(JSON.parse(localStorage.getItem("TablaHash-Arreglo")));
    tablaHash.capacity = CircularJSON.parse(JSON.parse(localStorage.getItem("TablaHash-Capacidad")));
    tablaHash.used = CircularJSON.parse(JSON.parse(localStorage.getItem("TablaHash-Ocupado")));
}

//No existe la block chain en el localStorage
if (localStorage.getItem("BlockChain-Primero") === null) { 
    let blockChain = new BlockChain();
    localStorage.setItem("BlockChain-Primero", JSON.stringify(CircularJSON.stringify(blockChain.first)));
    localStorage.setItem("BlockChain-Cantidad-Bloques", JSON.stringify(CircularJSON.stringify(blockChain.blocksCreated)));
}


const formularioLogin = document.getElementById('login-form')
formularioLogin.addEventListener("submit", login)

async function login(event) {
    event.preventDefault()
    let username = document.getElementById('username')
    let password = document.getElementById('password')
    if (username.value.trim() === '' || password.value.trim() === '') {
        username.value = ""
        password.value = ""    
        alert("Por favor, ingresa tus credenciales")
    }else {
        if (username.value === "Admin" && password.value === "Admin") {
            alert("Bienvenido Administrador");
            window.location.href= "pages/administrador.html"
        }else if (Number.isNaN(Number(username.value))) {
            username.value = ""
            password.value = ""
            alert("Credenciales incorrectas")
        }else {
            if (tablaHash !== null) {
                //Busca el usuario en la tabla,  si lo encuentra retorna el objeto, caso contrario null
                let aux = tablaHash.getUser(Number(username.value));
                if (aux !== null) {
                    const encryptedPassword = await sha256(password.value);
                    if (aux.password === encryptedPassword) {
                        localStorage.setItem('UsuarioEnSesion', aux.carnet)
                        alert("Bienvenido " + aux.name)
                        window.location.href = "pages/estudiante.html"
                    }else {
                        password.value = "";
                        alert("Contraseña incorrecta");
                    }
                }else {
                    username.value = "";
                    password.value = "";
                    alert("Credenciales incorrectas");
                }
            }else {
                username.value = "";
                password.value = "";
                alert("No hay estudiantes registrados en el sistema");
            }
        }
    }
}

//Recorre el árbol AVL en inorden y transfiere la información de cada nodo a la tabla
async function transferirData(node) {
    if (node != null) {
        await transferirData(node.left);
        const password = await sha256(node.password)
        tablaHash.addNode(node.name, node.carnet, password, node.rootDirectory);
        await transferirData(node.right)
    }
}

//Función para encriptar el password con sha-256
async function sha256(contrasenia) {
    let password;
    const encoder = new TextEncoder();
    const contraseniaCodificada = encoder.encode(contrasenia);
    await crypto.subtle.digest("SHA-256", contraseniaCodificada)
    .then((result) => {
        const hashArray = Array.from(new Uint8Array(result));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        password = hashHex;
    }).catch((err) => {
        password = contrasenia;
    });
    return password;
}

