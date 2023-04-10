Universidad de San Carlos de Guatemala  
Facultad de Ingeniería  
Escuela de Ingeniería en Ciencias y Sistemas  
Estructuras de Datos  
Primer Semestre 2023  

Angel Miguel García Urizar  
201901421  
___ 
# **MANUAL DE USUARIO**  
___  
  
## REQUISITOS PARA UTILIZAR EL PROGRAMA
* Tener un navegador de internet
* Contar con conexión a internet  
  
## ACERCA DEL PROGRAMA  
La aplicación de EDD GoDrive es una aplicación web diseñada para la facultad de ingeniería de la Universidad de San Carlos de Guatemala. GoDrive es un sistema de almacenamiento para los estudiantes, dentro de la aplicación el usuario cuenta con distintas opciones para el manejo de carpetas, donde podrá subir archivos en ciertos formatos específicos. Adicionalmente el programa ofrece la opción de generar reportes para que el usuario pueda conocer en todo momento el estado de su espacio de almacenamiento.  
  
## FUNCIONAMIENTO DEL PROGRAMA  
Para acceder a EDD GoDrive, click en el siguiente enlace: [GoDrive](https://urizar-ag.github.io/EDD_1S2023_PY_201901421/EDD_Proyecto1_Fase2/index.html), en la página principal de la aplicación es donde el usuario inica sesión:
<details><summary>Página Principal EDD GoDrive</summary>  

![login](https://drive.google.com/uc?export=view&id=1pu3yYUkCXDL4A_B0x2OXCvq_q0gWUTV9)  
</details>  

### USUARIO ADMINISTRADOR  
La aplicación es un sistema cerrado por lo que la creación de las cuentas de los usuarios es una tarea que debe realizar el administrador, para acceder al sistema como usuario administrador se debe ingresar las siguientes credenciales: `Nombre de usuario: Admin`, `Contraseña: Admin`.  
La vista principal del usuario administrador es la siguiente:  
<details><summary>Vista Administrador</summary>  

![vista-administrador](https://drive.google.com/uc?export=view&id=1kPXIhSJ-CGoSduodgkO0L_AVwQgCiseu)  
</details>  
En el lado izquierdo de la vista administrador hay 3 botones que ofrecen al administrador distintas funcionalidades:  

* **Ver Alumnos:** Está opción cuenta con un selector donde se ofrecen 3 opciones distintas para ver el listado de alumnos:  
  *  Inorden  
  *  Preorden  
  *  Postorden  
  
  Al hacer click en el botón en pantalla se mostrara el listado de alumnos según la opción que se haya seleccionado.  
  
* **Árbol de Estudiantes:** Al hacer click en esta opción aparecera una pestaña extra donde se puede ver el reporte del árbol AVL con los estudiantes que existen dentro del sistema:  
  <details><summary>Reporte del Árbol AVL</summary>    

   ![reporte-avl](https://drive.google.com/uc?export=view&id=1hNQjVbXcp4ARENViL3N6XWb9MUy-9ycv)  
  </details>  
  
* **Carga Masiva:** Es en esta opción donde puede registrar a los usuarios que estarán disponibles en el sistema, para ello debe subir un archivo en forma json:  
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

  Al hacer click en el botón se registrará los usuarios que se encuentren el archivo json en el sistema, si el registro de los estudiantes fue exitoso en el lado derecho de la pantalla, el administrador podra ver los estudiantes del sistema, los estudiantes se mostrarán según como se explico en la opción de ver alumnos:  
    <details><summary>Listado de Estudiante</summary>    

     ![listado-estudiante](https://drive.google.com/uc?export=view&id=167OYL-zhvNd_Xe3LPfii1uwnFwtd0_E1)  
    </details>   

### USUARIO ESTUDIANTE  
Debido a que EDD GoDrive es un sistema cerrado (no cuenta con un sistema de registro disponible para cualquier visitante de la página), es el administrador quien debe brindar las credenciales propias a cada estudiante, las credenciales de un usuario: `Nombre de usuario: numero de Carnet`, `Contraseña: Debe ser brindada por el administrador`  

<details><summary>Vista Estudiante - Ejemplo 1</summary>  

![vista-estudiante](https://drive.google.com/uc?export=view&id=1o3K7j-di-mDDACtZU-ZWUyDaBhhlPXIz)  
</details>  

<details><summary>Vista Estudiante - Ejemplo 2</summary>  

![vista-estudiante2](https://drive.google.com/uc?export=view&id=1wOhtyeVUPGH1KTMcMS0Av-dBG-FQJk6X)  
</details>  

En el menú que se encuentra en el lateral izquierdo, el estudiante dispone de una serie de opciones para el manejo de carpetas y archivos, en el lateral derecho se podrá visualizar las carpetas y archivos que existan en el directorio donde el estudiante se encuentre ubicado, si no existe ninguna carpeta o archivo la sección se mostrará en blanco. Las opciones del menú lateral son las siguientes:  
*  **Búsqueda de carpeta:** Es por medio de la barra de búsqueda como el estudiante se mueve entre los diferentes directorios que existen en su almacenamiento, el directorio preterminado que se muestra al cargar la página es la carpeta raíz `/`.  
Para posicionarse en un directorio deseado, se debe escribir la dirección en la barra de búsqueda empezando desde la carpeta raíz hasta el nombre de la carpeta a la que se quiere acceder, separando cada nombre de carpeta con una `/`, haciendo click en el icono de búsqueda se muestra en pantalla el contenido de la carpeta.  
    1.  Para acceder a la carpeta Documentos que está en la carpeta raíz: `/Documentos`  
    2.  Para acceder a la carpeta primera_unidad que está dentro de la carpeta EDD, dentro de la carpeta Tareas, dentro de la carpeta raíz: `/Tareas/EDD/primera_unidad`  
  
*  **Crear Carpeta:** Para crear una carpeta debemos posicionarnos en la dirección en la que queremos crear la carpeta y en el recuadro que está en la opción de crear carpeta, escribir el nombre de la carpeta que queremos crear. Al hacer click en el botón de crear carpeta, si la carpeta se creo correctamente veremos la carpeta aparecer en la pantalla, caso contrario el programa nos informará que la carpeta no ha podido ser creada.  
    1. En el siguiente ejemplo se creo la carpeta `Documentos` en la carpeta raíz
       <details><summary>Crear Carpeta - Ejemplo 1</summary>  

    	![crear-carpeta](https://drive.google.com/uc?export=view&id=1PiyfO3ShNQD1zhScdLlV-5j7surpeLIb)  
  	   </details>  

    2. En el siguiente ejemplo dentro de la carpeta `Documentos` se creo `Carpeta1` dos veces, cuando en un directorio creamos una carpeta ya existente, el programa automáticamente la renombra, para este ejemplo como ya existía `Carpeta1` al crear la carpeta por segunda vez, la aplicación la carpeta se creo con el nombre de `Copia Carpeta1`  
	   <details><summary>Crear Carpeta - Ejemplo 2</summary>  

        ![crear-carpeta2](https://drive.google.com/uc?export=view&id=1dEsDYxPp2i_CF2u6vYxFRK1FIelH1DHv)  
       </details>  

* **Eliminar Carpeta:** Debemos posicionarnos en el directorio donde queremos eliminar la carpeta, en el recuadro propio de la opción debemos escribir el nombre la carpeta que queremos eliminar, hacemos click en el icono de eliminar carpeta, si la carpeta se elimino correctamente el programa nos informará de ello y la carpeta no debe aparecer más en nuestra pantalla, caso contrario no se logro eliminar la carpeta el programa nos alerta notificandonos que la carpeta no pudo ser eliminada.  
    1. En el siguiente ejemplo se eliminó  `Copia Carpeta1` en la dirección `/Documentos`
       <details><summary>Eliminar Carpeta</summary>  

    	![crear-carpeta](https://drive.google.com/uc?export=view&id=1pbKKP7QbWISdc8AUEsG7YZUcF2DVoXEz)  
  	   </details>  
  **NOTA 1:** Al eliminar una carpeta también se eliminan todas las carpetas y archivos que la carpeta eliminada contenga.  
  **NOTA 2:** La aplicación no permite eliminar la carpeta raíz.  
    
* **Reporte Carpetas:** Al hacer click en esta opción aparecera una pestaña extra donde se puede ver el reporte de todas las carpetas que el estudiante a creado en su espacio de almacenamiento:  
  <details><summary>Reporte de Carpetas</summary>    

   ![reporte-carpetas](https://drive.google.com/uc?export=view&id=1kZRnlIZ-batSqfWZJTzsUAwtLIJFaBK7)  
  </details> 

* **Reporte Archivos** Al hacer click en esta opción aparecera una pestaña extra donde se puede ver los archivos que esten almacenados en la carpeta donde estemos posicionados, en el reporte además de aparecer los archivos también aparecen los permisos compartidos para cada uno de los archivos, si estos tuvieren permisos compartidos, caso contrario aparecerá unicamente los archivos. En el siguiente ejemplo se generó el reporte de archivos para la carpeta raíz  
  <details><summary>Reporte de Archivos</summary>    

   ![reporte-archivos](https://drive.google.com/uc?export=view&id=1E541XgowMFzU1Be9JhRzKMXxPA0H5Wqp)
  </details>  

* **Bitácora** Al hacer click en esta opción se abrirá una pestaña extra donde se puede ver un registro de las carpetas y archivos que ha creado el usuario durante el uso de GoDrive, también aparece registrado las carpetas que el estudiante a eliminado.  
  <details><summary>Bitácora</summary>    

   ![bitacora](https://drive.google.com/uc?export=view&id=1Kh-3ibv7UmNjh1Y_WVwVYQoCVCZvoeJj)
  </details>  

* **Subir Archivos:** Esta opción permite subir archivos y almacenarlos dentro de nuestras carpetas, los archivos permitidos son documentos de texto, documentos pdf y cualquier tipo de imagen. Al hacer click en subir archivos, estos se almacenaran en la dirección que este colocada en nuestra barra de búsqueda. Si los archivos se suben correctamente estos deberán aparecer en pantalla.  
    1. En el siguiente ejemplo se subieron tres archivos en la dirección `/Documentos/Carpeta1`
       <details><summary>Subir Archivos</summary>  

    	![subir-archivos](https://drive.google.com/uc?export=view&id=1Kelj71xox9iGuMnpviyDCc5DZMUNG7mw)  
  	   </details>  
  **NOTA:** Si dentro de la carpeta donde cargamos el archivo, subimos otro archivo con el mismo nombre, el programa lo renombra automáticamente. Ejemplo, si subimos dos veces el logo de la USAC en pantalla deberíamos ver `logo-usac.png` y `logo-usac(1).png`         

* **Compartir Permisos** Esta opción nos permite compartir permisos sobre nuestros archivos a otros estudiantes, los permisos que podemos compartir son:  

  |Tipo de Permiso |Descripción |  
  |:--:|:--:|  
  |`r`|El otro estudiante solamente puede leer el archivo.|
  |`w`|El otro estudiante puede realizar modificaciones en el archivo.|
  |`rw`|El otro estudiante puede leer y realizar modificaciones en el archivo.|  
  
  Para compartir un archivo con otro estudiante, debemos ubicarnos en la dirección donde este almacenado el archivo, luego presionamos la opción "Compartir Permisos", a continuación debemos ingresar el carnet del estudiante con el que queremos compartir el archivo, el nombre del archivo que queremos compartir y el tipo de permiso que queremos otorgar, si todo ha salido correctamente el permiso quedará compartido con el usuario, caso contrario el sistema nos alertara que algo ha ido mal. Ejemplo, para este ejemplo se compartio el permiso para el archivo `prueba.txt` que está almacenado en carpeta raíz:  

    1.  Paso 1: Número de carnet:
        <details><summary></summary>  

    	   ![compartir-permiso1](https://drive.google.com/uc?export=view&id=1-HE4ckDPUDByXjyRHM_3BH-pQiKYfLhf)  
  	    </details>  
    2.  Paso 2: Nombre del archivo a compartir:
        <details><summary></summary>  

    	   ![compartir-permiso2](https://drive.google.com/uc?export=view&id=1MaFxr1EVzp37yKNJA0NHFCou79pdYwRZ)  
  	    </details>  
    3.  Paso 3: Tipo de permiso a otorgar:
        <details><summary></summary>  

    	   ![compartir-permiso3](https://drive.google.com/uc?export=view&id=1lccnDv-zBtg9A6RL6Mc35hQ7yxu477C4)  
  	    </details>  

 