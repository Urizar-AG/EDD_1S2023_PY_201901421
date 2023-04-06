let fileName = localStorage.getItem('archivoNombre')
let contenido = localStorage.getItem('archivoContenido')
localStorage.removeItem('archivoNombre')
localStorage.removeItem('archivoContenido')
fileName = fileName.split('.')
if (fileName[1] === "txt") {
    document.getElementById('texto').innerHTML = contenido
    document.getElementById('imagen').style.display = 'none';
    document.getElementById('pdf').style.display = 'none';
}else if (fileName[1] === "pdf") {
    document.getElementById('pdf').src = contenido
    document.getElementById('texto').style.display = 'none';
    document.getElementById('imagen').style.display = 'none';
} else {
    document.getElementById('imagen').src = contenido
    document.getElementById('texto').style.display = 'none';
    document.getElementById('pdf').style.display = 'none';
}
