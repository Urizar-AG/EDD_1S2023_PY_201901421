Universidad de San Carlos de Guatemala  
Facultad de Ingeniería  
Escuela de Ingeniería en Ciencias y Sistemas  
Estructuras de Datos  
Primer Semestre 2023  

Angel Miguel García Urizar  
201901421
<h1><p style="text-align: center;"><b>MANUAL TÉCNICO PROYECTO1 FASE1</b></p></h1>  

## AMBIENTE DE DESARROLLO  
El programa se desarrolló en el sistema operativo Windows 10

* **Lenguaje de Programación y IDE**
    * Golang versión 1.20
    * Visual Studio Code versión 1.75.1  
  
* **Herramientas utilizadas**
    * Graphviz para Windows versión 6.0.1

> [Click aquí para consultar la documentación de Go](https://go.dev/doc/)  
> [Click aquí para consultar la documentación de Graphviz](https://graphviz.org/documentation/)

## ACERCA DEL PROGRAMA
GoDrive es un programa de almacenamiento de archivos para la facultad de ingeniería de la universidad, su funcionamiento será similar al  
de Google Drive. Para la fase 1 de este proyecto se solicitó que el programa fuera hecho en lenguaje de programación Go.  

En esta fase el programa se utiliza para el control de alumnos, que en las siguientes fases son los que tendran acceso al sistema. Esta fase  
está diseñada para su uso en consola, contando únicamente como parte grafica los reportes, estos generados mediante graphviz, que el programa genera de forma automática.

Para el control de alumnos se requiere que el programa cuente con un usuario administrador quien podrá registrar alumnos, que deben ser
almacenados en una cola de pendientes, la cual posteriormente es revisada por el administrador donde decide si rechaza o acepta al alumno
y lo agrega al registro de alumnos del sistema. A esta cola de pendientes también se pueden agregar alumnos por medio de la carga de un archivo con extensión csv. 

Se quiere llevar un registro de las acciones del administrador como de cada uno de los alumnos, por lo que las acciones se almacenan en una pila. Donde se tiene una pila para llevar las acciones del administrador y así también cada alumno que este registrado en el sistema debe contar con su propia pila de registros. Es necesario que se indique la fecha y hora en que se realiza la acción. 

Para el almacenamiento de los alumnos que forman parte del sistema se utiliza una lista enlazada doble donde cada nodo de la lista tiene asociado una pila cuyo uso ya fue mencionado anteriormente. Adicionalmente se puede generar un reporte en formato JSON que contiene el listado de alumnos registrados en el sistema.

## ESTRUCTURAS UTILIZADAS

1. Lista Doblemente Enlazada (lista de pilas)
2. Pila
3. Cola

## ACERCA DEL ARCHIVO CSV
El usuario administrador tiene la posiblidad de agregar alumnos a la cola de pendientes mediante la carga de un archivo csv que sigue una estructura como la que se muestra a continuación. Para la lectura del archivo se utiliza el paquete encoding/csv proporcionado por la librería estándar de Go.
<pre><code>carnet,nombre,contraseña
201901421,Angel García,angel123
202400000,Juan Castillo,PASS43
202500123,Andrea Ortiz,123qwerty
</code></pre>

## ACERCA DE LOS REPORTES Y EL ARCHIVO JSON
El programa debe generar reportes donde se muestre gráficamente el estado actual de la cola de alumnos pendientes, la pila de registro de las acciones del administrador, la lista de pilas donde se almacenan los alumnos que forman parte del sistema. Los reportes se generan automáticamente según las acciones ejecutadas en el programa, los reportes son escritos en archivos en formato dot y luego estos archivos son convertidos a imágenes en formato svg.  

Adicionalmente el programa también debe generar un reporte en un archivo json de los alumnos que forman parte del sistema, el archivo se genera utilizando el paquete encoding/json proporcionado por la librería estándar de Go. La estructura del archivo json es la siguiente. 
<details><summary>Ejemplo Archivo JSON</summary>

```json
{
    "alumnos": [
        {
            "nombre": "Angel García",
            "carnet": 201901421,
            "password": "angel123",
            "Carpeta_Raiz": "/"
        },
        {
            "nombre": "Juan Castillo",
            "carnet": 202400000,
            "password": "PASS43",
            "Carpeta_Raiz": "/"
        },
        {
            "nombre": "Andrea Ortiz",
            "carnet": 202500123,
            "password": "123qwerty",
            "Carpeta_Raiz": "/"
        }
    ]
}
```

</details>

Para la generación del archivo json con encoding/json se requiere el uso de los siguientes objetos
<details><summary>Estructuras auxiliares</summary>

```go
type studentJSON struct {
	Nombre   string `json:"nombre"`
	Carnet   int    `json:"carnet"`
	Password string `json:"password"`
	Carpeta  string `json:"Carpeta_Raiz"`
}

type studentsArrayJSON struct {
	Alumnos []studentJSON `json:"alumnos"`
}

```

</details>


## MÉTODOS DEL PROGRAMA
A continuación se describe brevemente las funciones y métodos que forman parte de cada una de las estructuras empleadas en el programa. 

<details><summary>Funcionalidades Del Programa</summary>

|Nombre |Descripción |
|:--:|:--|
|main()|Función principal en la que se ejecuta el programa.|
|menuAdministrador()|Método desde el que se ejecutan las funcionalidades del usuario administrador.|
|loginUsuario(carnet int, password string)|Verifica las credenciales de un usuario al iniciar sesión.|
|verEstudiantesPendientes()|Muestra la cola de pendientes alumno por alumno, el administrador acepta o rechaza al estudiante.|
|cargaMasiva()|Lee el archivo csv y agrega la información a la cola de pendientes.|
|validarRepetidos(carnet int, name string, lastName string, password string)|Revisa la cola de pendientes y la lista de pilas buscando un carnet que coincida. Si no encuentra coincidencia lo agrega a la cola o a la lista según corresponda, caso contrario indica la coincidencia.|

</details>

<details><summary>Lista Doblemente Enlazada (Lista de Pilas)</summary>

|Nombre |Descripción |
|:--:|:--|
|NewDoublyLinkedList()|Función con la que se crea la instancia de una lista doble.|
|AddSort(carnet int, name string, lastName string, password string)|Agrega un nuevo nodo a la lista, la inserción se hace en orden de menor a mayor utilizando el carnet de los alumnos.|
|SearchStudent(carnet int, password string)|Busca al estudiante dentro de la lista, si lo encuentra devuelve el nodo, caso contrario retorna nil.|
|PrintStudents()|Imprime todos los nodos de la lista en consola.|
|IsEmpty()|Comprueba si la lista está vacía o no.|
|GraphDoublyLinkedList()|Genera el reporte gráfico con la información completa de todos los nodos de la lista.|

</details>

<details><summary>Pila</summary>

|Nombre |Descripción |
|:--:|:--|
|NewStack()|Función con la que se crea la instancia de una pila.|
|Push(description string, sesion string)|Agrega un nuevo nodo al inicio de la pila.|
|Peek()|Devuele el primer nodo de la pila.|
|IsEmpty()|Comprueba si la pila está vacía o no.|
|PrintStack()|Muestra todos los nodos de la pila en consola.|
|GraphStack()|Genera el reporte gráfico con la información completa de todos los nodos de la pila.|

</details>

<details><summary>Cola</summary>

|Nombre |Descripción |
|:--:|:--|
|NewCola()|Función con la que se crea la instancia de una cola.|
|Enqueue(carnet int, name string, lastName string, password string)|Agrega un nuevo nodo al final de la cola.|
|Dequeue()|Elimina el primer nodo de la cola.|
|Peek()|Devuele el primer nodo de la cola.|
|IsEmpty()|Comprueba si la cola está vacía o no.|
|SearchStudent(carnet int)|Verifica si el nodo existe en la cola, true ya existe, false no encontró ninguna coincidencia.| 
|PrintQueue()|Muestra todos los nodos de la cola en consola.|
|GraphQueue()|Genera el reporte gráfico con la información completa de todos los nodos de la cola.|

</details>

<details><summary>Métodos Para Los Reportes</summary>

|Nombre |Descripción |
|:--:|:--|
|generarDot(fileName string, data string)|Crea un archivo dot con el nombre indicado y escribe la información que recibe en el archivo.|
|convertirDot(fileNameDot string, fileNameImage string)|Convierte una archivo dot a imagen con extensión svg.|
|generarJSON(fileName string, doublyLL *DoublyLinkedList)|Genera un archivo json con los alumnos almacenados en la lista doblemente enlazada.|

</details>

## DIAGRAMA DE CLASES  
![Diagrama](https://drive.google.com/uc?export=view&id=1Np8GFfaswo7U2mTXW9x8b9OKtw7Tf6yG)  
