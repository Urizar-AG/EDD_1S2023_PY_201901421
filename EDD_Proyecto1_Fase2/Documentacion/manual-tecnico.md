Universidad de San Carlos de Guatemala  
Facultad de Ingeniería  
Escuela de Ingeniería en Ciencias y Sistemas  
Estructuras de Datos  
Primer Semestre 2023  

Angel Miguel García Urizar  
201901421  
___ 
# **MANUAL TÉCNICO**  
___
## AMBIENTE DE DESARROLLO  

El programa se desarrolló en el sistema operativo Windows 10

* **Lenguaje de Programación y editor de código**
    * Javascript
    * Visual Studio Code versión 1.75.1  
  
* **Herramientas utilizadas**
    * QuickChart GraphViz API
    * Circular-json
    * Github Pages  
> [Click aquí para consultar la documentación de QuickChart](https://quickchart.io/documentation/graphviz-api/)  

## ACERCA DEL PROGRAMA  
GoDrive es un programa de almacenamiento de archivos para la facultad de ingeniería de la universidad, su funcionamiento será similar al  
de Google Drive. Para la fase 2 de este proyecto se solicitó que el programa fuera hecho en lenguaje de programación Javascript.  

En esta fase el programa está diseñado para llevar un control de usuarios por parte del administrador, donde cada usuario tendra un espacio de almacenamiento donde se puede crear y eliminar carpetas, también se pueden subir archivos de texto, pdf o cualquier tipo de imagen.  El uso de este programa es por medio de una página web alojada en Github Pages, la página web está diseñada con HTML, CSS y Javascript. También se hace uso de Graphviz por medio de la API de QuickChart para la generación de reportes.  
  
La aplicación es un sistema cerrado por lo que para la existencia de usuarios se requiere que el administrador cargue un archivo json con los datos de los usuarios, este listado de usuarios se almacena en árbol AVL, el administrador es capaz de ver este listado en la interfaz gráfica de las 3 formas que ofrece el recorrido de arboles (in-orden, pre-orden, post-orden).  
  
Como cada usuario debe contar con un espacio de almacenamiento, cada nodo del árbol AVL cuenta con un árbol n-ario, cada nodo de este árbol n-ario almacena las carpetas creadas por el usuario. Como el usuario también tiene la capacidad de subir archivos, a los cuales puede otorgar permisos a otros usuarios sobre dichos archivos, cada nodo del árbol n-ario cuenta con una matriz dispersa. Está matriz dispersa se utiliza para el almacenamiento de los archivos, como de los permisos que otorga el usuario a otros usuarios sobre dichos archivos. Los tipos de archivos que puede subir el usuario son con extensión "txt", "pdf" y cualquier extensión de imagen.  
  
Adicionalmente se requiere que el usuario sea capaz de ver un registro de las carpetas y archivos que ha creado o eliminado, es por ello que cada nodo del árbol AVL, también cuenta con una lista circular. En la lista circular se almacena la acción que ha realizado el usuario y la fecha y hora en que dicha acción fue realizada.  
  
Para lograr la persistencia de datos, GoDrive utiliza localStorage para el almacenamiento de las estructuras, valiendose de circular-json para lograr esta persistencia en el localStorage.  
  
## ESTRUCTURAS UTILIZADAS  
1. Árbol AVL
2. Árbol n-ario  
3. Matriz Dispersa  
4. Lista Circular Simple
 
## ACERCA DEL ARCHIVO JSON  
Ya que EDD GoDrive es un sistema cerrado, para la creación de las cuentas de usuario el admnistrador tiene la capacidad de realizar una carga masiva por medio de un archivo json. Dicho archivo debe contener la información necesaria de los usuarios para la creación de una cuenta.
<details><summary>Ejemplo Archivo JSON</summary>

```json
{
	"alumnos": [
		{
			"nombre": "Cristian Suy",
			"carnet": 201700918,
			"password": "Cris123",
			"Carpeta_Raiz": "/"
		},
		{
			"nombre": "Juan Perez",
			"carnet": 201901420,
			"password": "qwerty",
			"Carpeta_Raiz": "/"
		},
		{
			"nombre": "Angel Garcia",
			"carnet": 201901421,
			"password": "123",
			"Carpeta_Raiz": "/"
		}
	]
}

```

</details>  
  
## ACERCA DE LOS REPORTES  
Dentro de la aplicación existen distintos reportes que pueden ser generados, reporte de los usuarios registrados en el sistema (árbol AVL), reporte de carpetas (árbol n-ario), reporte de archivos (matriz dispersa), bitácora de registros (lista circular). El reporte en lenguaje dot se escribe en cada estructura, pero la generación de la imagen para su uso dentro de la interfaz gráfica del programa, se hace mediante peticiones a la API de QuickChart GraphViz.  
  
## MÉTODOS DEL PROGRAMA
A continuación se describe brevemente las funciones y métodos que forman parte de cada una de las estructuras empleadas en el programa. 

<details><summary>Administrador</summary>

|Nombre |Descripción |
|:--:|:--|
|llenarTabla()|Método con el que se llama a cada uno de los recorridos del árbol AVL según corresponda a la selección del administrador.|
|cargaMasiva()|Analiza el archivo json que sube el administrador y guarda la información de los usuarios en el árbol AVL.|
|inorden(node)|Método que recibe por parámetro el nodo raíz del árbol AVL y hace el recorrido in-orden del árbol AVL, agregando los nodos a una tabla en html.|
|preorden(node)|Método que recibe por parámetro el nodo raíz del árbol AVL y hace el recorrido pre-orden del árbol AVL, agregando los nodos a una tabla en html.|
|postorden(node)|Método que recibe por parámetro el nodo raíz del árbol AVL y hace el recorrido post-orden del árbol AVL, agregando los nodos a una tabla en html.|
</details>  
  
<details><summary>Estudiante</summary>

|Nombre |Descripción |
|:--:|:--|
|cargarCarpetaRaiz()|Método ejecutado al cargar el body de la página html, se encarga de mostrar la carpeta raíz en la interfaz del estudiante.|
|buscarDirectorio()|Recupera la información de la barra de búsqueda de carpetas y la busca en el árbol n-ario asocidado al estudiante en sesión.|
|crearDirectorio()|Se encarga de obtener el directorio y nombre de la carpeta a crear y la agrega al árbol n-ario.|
|eliminarDirectorio()|Método que se encarga de obtener el directorio y nombre de la carpeta a eliminar y la elimina del árbol n-ario.|
|cargarArchivos()|Método que obtiene los archivos subidos por el estudiante y recupera el directorio de la barra de búsqueda, y agrega los archivos a la matriz dispersa asociada a la carpeta.|
|otorgarPermiso()|Pregunta al estudiante el carnet, nombre del archivo y permiso que se le quiere dar a otro estudiante. Y registra el permiso en la matriz dispersa asociada a la carpeta donde se encuentre el archivo.|
|imprimir(carpeta)|Método que recibe un nodo del árbol n-ario como argumento, obteniendo las carpetas y archivos asociadas a dicho nodo y muestra la representación en la vista de estudiante.|  
|registrarActividad(name, tipo, tipo2)|Método que se encarga de registrar la creación/eliminación de carpetas y archivos por parte del usuario en la lista circular. Recibe 3 argumentos, name: nombre de la carpeta o archivo; tipo: "crear"/"eliminar"; tipo2: "carpeta"/"archivo".|
</details>  
  
<details><summary>Árbol AVL</summary>

|Nombre |Descripción |
|:--:|:--|
|add(name, carnet, password, rootDirectory)|Crea un nuevo nodo con la información del usuario y lo agrega al árbol.|
|_add(node, name, carnet, password, rootDirectory)|Esta función es la parte recursiva del método add, el argumento node es un nodo del árbol AVL.|
|RSD(node)|Función que realiza la rotación simple por la derecha.|
|RSI(node)|Función que realiza la rotación simple por la izquierda.|
|RDI(node)|Función que realiza una rotación doble por la izquierda.|
|RDD(node)|Función que realiza una rotación doble por la derecha.|
|getById(node, id)|Función recursiva que recibe de argumento un nodo del árbol AVL y un id numérico, recorre el árbol buscando el id. Si encuentra el nodo lo devuelve, caso contrario retorna null.|  
|getHeight(node)|Función que devuelve el atributo height del nodo que recibe como argumento. Si el parámetro es nulo retorna -1.|
|getDot()|Función que devuelve una cadena con el código dot del árbol AVL.|  
|writeDot(node, numero)|Función que recorre el árbol y escribe la información en lenguaje dot y lo retorna en una cadena. EL parámetro node es u nodo del árbol, y numero es una variable auxiliar de tipo int.|
</details>  
  
<details><summary>Árbol N-ario</summary>

|Nombre |Descripción |
|:--:|:--|
|add(path, name)|Función recursiva que recibe como argumento un directorio y el nombre de la carpeta a crear en dicho directorio, retorna el nombre de la carpeta, si logro agregar la carpeta al árbol y caso contrario retorna null.|
|addNode(ls, name)|Función que agrega un nuevo nodo al árbol, ls: arreglo con el directorio donde se debe crear la carpeta y name: es el nombre de la carpeta a crear.|
|addSort(node, newNode)|Método que agrega un nodo al nodo padre, siguiendo un orden ascendente. EL parámetro node representa el nodo padre donde se quiere insertar el nuevo nodo y newNode es el nodo a agregar.|
|search(ls, name)|Función que recorre el árbol para comprobrar si una carpeta existe o no, ls es un arreglo que contiene el directorio donde buscar y name es el nombre de la carpeta a buscar en el directorio.|
|getDir(path)|Función que obtiene el directorio (nodo) si lo encuentra, caso contrario retorna null. El nodo a buscar es el valor que recibe como argumento.|
|getNode(ls, name)|Recorre el árbol buscando el nodo, si lo encuentra retorna el nodo, caso contrario retorna null. El parámetro ls corresponde al arreglo que contiene el directorio donde buscar y name es el nombre de la carpeta a buscar.|
|removeDir(path, name)|Función que elimina una carpeta del árbol, true si logro eliminarla y false caso contrario. El parámetro path corresponde al directorio donde eliminar la carpeta y name es el nombre de la carpeta a eliminar.|  
|deleteNode(ls, name)|Recorre el árbol y elimina el nodo indicado, si lo elimina correctamente devuelve true, si no logró eliminarlo devuelve false. El parámetro ls corresponde a un arreglo que contiene el directorio donde buscar y name es el nombre de la carpeta a eliminar.|
|getDot()|Función que devuelve una cadena con el código dot del árbol n-ario.|  
|getValue()|Fución que devuelve una cadena que contiene el nodo raíz del árbol y el resto de nodos hijos.|
|getNextValue()|Retorna una cadena en lenguaje dot que contiene los nodos hijos del nodo raíz del árbol.|  
|mergeBranches(node, cnt)|Función recursiva que devuelve una cadena en lenguaje dot que une los nodos padres con los nodos hijos según corresponda. El parámetro node corresponde a un nodo del árbol n-ario y cnt es una variable auxiliar de tipo entero.|
</details>

<details><summary>Lista Circular Simple</summary>  

|Nombre |Descripción |  
|:--:|:--|  
|add(description, date, time)|Crea un nuevo nodo con la información recibida y lo agrega a la lista circular simple. El parámetro description corresponde a una cadea de texto, date es una cadena de texto que contiene la fecha y time es una cadena de texto que contiene la hora.|  
|writeDot()|Función que recorre la lista circular y devuele una cadena de texto con código dot de los nodos de la lista.|
</details>   
  
<details><summary>Matriz Dispersa</summary>  

|Nombre |Descripción |  
|:--:|:--|  
|addRow(pos, name)|Crea un nuevo nodo con la información recibida por parámetro y lo agrega a la lista (primera columna de la matriz) de archivos. EL parámetro "pos" corresponde a la coordenada "Y" de la matriz y "name" es el nombre del archivo a agregar.|
|addColumn(pos, name)|Crea un nuevo nodo con la información recibida por parámetro y lo agrega a la lista (primera fila de la matriz) de carnets. EL parámetro "pos" corresponde a la coordenada "X" de la matriz y "name" es el número del carnet a agregar.|    
|addNode(x, y, permission)|Los parámetros "x" y "y" son las coordenadas de la matriz donde se debe insertar el nodo. Y "permission" el tipo de permiso que se quiere otorgar al usuario con el que se comparte el archivo.|  
|addFile(name, numero)|Función recursiva que se encarga de agregar una nueva carpeta al árbol, donde "name" es el nombre del archivo a agregar y "numero" es una variable auxiliar de tipo entero. Si el archivo se agrega correctamente retorna el nombre del archivo y en caso contrario retorna null.|
|addPermission(file, carnet, permission)|Función que se encarga de registrar un permiso otorgado a otro usuario sobre un archivo. Recibe 3 argumentos, "file" es el nombre del archivo a compartir, "carnet" es el carnet del estudiante con el que se quiere compartir el archivo y "permission" es el tipo de permiso. Si el archivo se agrega correctamente retorna true y caso contrario retorna false.|  
|getRow(name)|Recorre la primera columna de la matriz buscando si el archivo existe o no, si lo encuentra retorna el nodo, caso contrario retorna null. El parámetro "name" corresponde al nombre del archivo a buscar.|  
|getColumn(carnet)|Recorre la primera fila de la matriz buscando si el carnet existe o no, si lo encuntra retorna el nodo, caso contrario retorna null. El parámetro "carnet" corresponde al carnet a buscar.|
|getDot()|Función que recorre la matriz dispersa y devuele una cadena de texto con código dot de la estructura de la matriz.|   

</details>  

## DIAGRAMA DE CLASES  
![Diagrama](https://drive.google.com/uc?export=view&id=1tvK3Hi6zlyiWSIKORFTwPC8CVm40nU7o)  
