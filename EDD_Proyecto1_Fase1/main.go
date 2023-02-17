package main

import (
	"EDD_Proyecto1_Fase1/Estructuras"
	"fmt"
	"strconv"
)

var colaPendientes = Estructuras.NewCola()

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
				userInt, _ := strconv.Atoi(user) //Convierte String a Int
				fmt.Println("Usuario: ", userInt)
			}
		case 2:
			fmt.Println("> Cerrando programa...")
			option = 2
		default:
			fmt.Println("> Ingresa una opción valida")
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
		case 2:
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
		case 5:
			fmt.Println("Cerrando Sesión...")
			option = 5
		default:
			fmt.Println("Ingresa una opción valida")
			fmt.Println()
		}
	}
}
