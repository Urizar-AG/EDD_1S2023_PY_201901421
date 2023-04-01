const body = document.querySelector('body')
body.onload = generarImagen

function generarImagen() {
    let url = 'https://quickchart.io/graphviz?graph=';
    let cadena = localStorage.getItem('actividadBitacora')
    document.getElementById('bitacora').src = url + cadena
}