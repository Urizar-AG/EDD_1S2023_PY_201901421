import { AVL } from "../Estructuras/ArbolAVL.js";

//Recupera los datos de localStorage y los almacena en el árbol
let avl = null
if (localStorage.getItem("ArbolAVL") !== null) {
    avl = new AVL()
    avl.root = JSON.parse(localStorage.getItem("ArbolAVL"))
}

const formularioLogin = document.getElementById('login-form')
formularioLogin.addEventListener("submit", login)

function login(event) {
    event.preventDefault()
    let username = document.getElementById('username')
    let password = document.getElementById('password')
    if (username.value.trim() === '' || password.value.trim() === '') {
        username.value = ""
        password.value = ""    
        alert("Por favor, ingresa tus credenciales")
    }else {
        if (username.value === "Admin" && password.value === "Admin") {
            alert("Bienvenido Administrador")
            window.location.href= "pages/administrador.html"
        }else if (Number.isNaN(Number(username.value))) {
            username.value = ""
            password.value = ""
            alert("Credenciales incorrectas")
        }else {
            if (avl !== null) {
                //Busca el usuario en el árbol,  si lo encuentra retorna el objeto, caso contrario null
                let aux = avl.getById(avl.root, Number(username.value))
                if (aux !== null) {
                    if (aux.password === password.value) {
                        localStorage.setItem('usuarioEnSesion', aux.carnet)
                        alert("Bienvenido " + aux.name)
                        window.location.href = "pages/estudiante.html"
                    }else {
                        password.value = ""
                        alert("Contraseña incorrecta")
                    }
                }else {
                    username.value = ""
                    password.value = ""
                    alert("Credenciales incorrectas")
                }
            }else {
                username.value = ""
                password.value = ""
                alert("No hay estudiantes registrados en el sistema")
            }
        }
    }
}