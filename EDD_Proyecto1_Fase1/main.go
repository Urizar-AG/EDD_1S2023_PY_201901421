package main

import (
	"EDD_Proyecto1_Fase1/Estructuras"
	"encoding/csv"
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
	"time"
)

var colaPendientes = Estructuras.NewCola()
var listaEstudiantes = Estructuras.NewDoublyLinkedList()

const formatoFechaHora string = "02/01/2006 03:04:05 PM"

func main() {

	var option int = 0

	for option != 2 {

		fmt.Println("########################################")
		fmt.Println("#               GODRIVE                #")
		fmt.Println("########################################")
		fmt.Println("# 1.Iniciar Sesión                     #")
		fmt.Println("# 2.Salir del Sistema                  #")
		fmt.Println("#                                      #")
		fmt.Println("########################################")
		fmt.Println("> Elige una opción: ")
		fmt.Scanln(&option)

		switch option {
		case 1:
			var user string
			var password string

			fmt.Println("> Ingresa tu Usuario: ")
			fmt.Scanln(&user)
			fmt.Println("> Ingresa tu Contraseña: ")
			fmt.Scanln(&password)

			if user == "admin" && password == "admin" {
				menuAdministrador()
			} else {
				if !(listaEstudiantes.IsEmpty()) {
					userInt, _ := strconv.Atoi(user) //Convierte String a Int
					loginUsuarios(userInt, password)
				} else {
					fmt.Println("> No existe ningun usuario en el sistema")
				}
			}
		case 2:
			fmt.Println("> Cerrando programa...")
			option = 2
		default:
			fmt.Println("> Ingresa una opción válida")
			fmt.Println()
		}
	}
}

func menuAdministrador() {

	var option int = 0

	for option != 5 {

		fmt.Println("########################################")
		fmt.Println("#               GODRIVE                #")
		fmt.Println("#       DASHBOARD ADMINISTRADOR        #")
		fmt.Println("########################################")
		fmt.Println("# 1.Ver Estudiantes Pendientes         #")
		fmt.Println("# 2.Ver Estudiantes del Sistema        #")
		fmt.Println("# 3.Registrar Nuevo Estudiante         #")
		fmt.Println("# 4.Carga Masiva de Estudiantes        #")
		fmt.Println("# 5.Cerrar Sesión                      #")
		fmt.Println("#                                      #")
		fmt.Println("########################################")
		fmt.Println("> Elige una opción: ")
		fmt.Scanln(&option)

		switch option {
		case 1:
			if !(colaPendientes.IsEmpty()) {
				verEstudiantesPendientes()
			} else {
				fmt.Println("> No hay estudiantes pendientes en la cola")
			}
		case 2:
			if !(listaEstudiantes.IsEmpty()) {
				listaEstudiantes.PrintStudents()
			} else {
				fmt.Println("> No existen estudiantes registrados en el sistema")
			}
		case 3:
			var (
				carnet   int
				name     string
				lastName string
				password string
			)
			fmt.Println("> Ingresa los datos del estudiante:")
			fmt.Println("> Carnet Nombre Apellido Contraseña")
			_, err := fmt.Scanln(&carnet, &name, &lastName, &password)
			if err != nil {
				fmt.Println(err)
			} else {
				colaPendientes.Enqueue(carnet, name, lastName, password)
			}
		case 4:
			cargaMasiva()
		case 5:
			fmt.Println("Cerrando Sesión...")
			option = 5
		default:
			fmt.Println("Ingresa una opción válida")
			fmt.Println()
		}
	}
}

func loginUsuarios(carnet int, password string) {
	user, success := listaEstudiantes.SearchStudent(carnet, password)
	if user != nil && success {
		sesion := time.Now().Format(formatoFechaHora) //Obtiene la fecha y hora de inicio de sesión
		user.Bitacora.Push("Inicio Sesión", sesion)
		fmt.Printf("> Se inicio sesión correctamente, %s", sesion)
		fmt.Println()
		user.Bitacora.PrintStack()
	} else {
		fmt.Println("> Credenciales incorrectas")
	}
}

func verEstudiantesPendientes() {

	var option int = 0

	for option != 3 {

		aux := colaPendientes.Peek() // Obtiene el primer elemento de la cola

		fmt.Println("########################################")
		fmt.Println("         Estudiantes Pendientes         ")
		fmt.Printf("             Pendientes: %d             \n", colaPendientes.Length)
		fmt.Println("########################################")
		fmt.Printf("Estudiante Actual: %d, %s %s \n", aux.Carnet, aux.Name, aux.LastName)
		fmt.Println("# 1.Aceptar Estudiante                 #")
		fmt.Println("# 2.Rechazar Estudiante                #")
		fmt.Println("# 3.Volver al menú principal           #")
		fmt.Println("#                                      #")
		fmt.Println("########################################")
		fmt.Println("> Elige una opción: ")

		_, err := fmt.Scanln(&option)
		if err == nil {
			switch option {
			case 1:
				listaEstudiantes.AddSort(aux.Carnet, aux.Name, aux.LastName, aux.Password)
				fmt.Printf("> Se registro a %d en el sistema", aux.Carnet)
				fmt.Println()
				colaPendientes.Dequeue()

				//Regresa al menú principal si la cola queda vacía
				if colaPendientes.IsEmpty() {
					fmt.Println("> No hay mas estudiantes pendientes en la cola")
					fmt.Println("> Devuelta al menú principal")
					option = 3
				}
			case 2:
				fmt.Println("> Se rechazo al estudiante")
				colaPendientes.Dequeue()

				//Regresa al menú principal si la cola queda vacía
				if colaPendientes.IsEmpty() {
					fmt.Println("> No hay mas estudiantes pendientes en la cola")
					fmt.Println("> Devuelta al menú principal")
					option = 3
				}
			case 3:
				fmt.Println("> Devuelta al menú principal")
				option = 3
			default:
				fmt.Println("> Ingresa una opción válida")
			}
		} else {
			fmt.Println("> Ocurrio un error:", err)
		}
	}
}

func cargaMasiva() {

	var route string

	fmt.Println("> Ingresa la ruta del archivo: ")
	fmt.Scanln(&route)
	file, errOpen := os.Open(route)
	if errOpen != nil {
		fmt.Println("> No fue posible cargar el archivo, error:", errOpen)
	} else {
		csvReader := csv.NewReader(file)
		csvReader.Read() //Lee la primera línea para saltar encabezados

		//Lee línea por línea
		for {
			student, err := csvReader.Read()
			if err == io.EOF {
				break
			}
			if err != nil {
				fmt.Println("> Ocurrio un error al leer el archivo:", errOpen)
			} else {
				var name, lastName string

				carnet, _ := strconv.Atoi(student[0])
				fullName := strings.Split(student[1], " ")
				if len(fullName) > 1 {
					name = fullName[0]
					lastName = fullName[1]
				} else {
					name = fullName[0]
					lastName = fullName[0]
				}
				password := student[2]
				colaPendientes.Enqueue(carnet, name, lastName, password)
			}
		}
	}
	defer file.Close()
}
