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
        }else if (Number.isNaN(Number(username.value))) {
            username.value = ""
            password.value = ""
            alert("Credenciales incorrectas")
        }
    }
}