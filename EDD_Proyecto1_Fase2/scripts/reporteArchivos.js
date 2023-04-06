const body = document.querySelector('body')
body.onload = generarImagen

function generarImagen() {
    let url = 'https://quickchart.io/graphviz?graph=';
    let cadena = localStorage.getItem('dotArchivos')
    document.getElementById('matriz').src = url + cadena
    localStorage.removeItem('dotArchivos')
}
