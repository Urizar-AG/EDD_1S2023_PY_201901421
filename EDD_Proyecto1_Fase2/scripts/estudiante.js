const side = document.querySelector('.side');
let btnOcultar = document.getElementById('ocultar')
btnOcultar.addEventListener('click', () => {
    side.classList.toggle('closed');
})

/*--------------------- Cerrar Sesión ---------------------*/
const btnLogout = document.getElementById('logout')
btnLogout.addEventListener("click",  (e) => {
    localStorage.removeItem('usuarioEnSesion')
    window.location.href = "../index.html";
})