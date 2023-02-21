package Estructuras

import (
	"encoding/json"
	"fmt"
	"os"
	"os/exec"
)

// objetos json
type studentJSON struct {
	Nombre   string `json:"nombre"`
	Carnet   int    `json:"carnet"`
	Password string `json:"password"`
	Carpeta  string `json:"Carpeta_Raiz"`
}

// Array de objetos json
type studentsArrayJSON struct {
	Alumnos []studentJSON `json:"alumnos"`
}

// Crea un archivo dot y escribe en él
func generarDot(fileName string, data string) {
	//Si el archivo no existe lo crea, si ya existe lo abre en lectura/escritura
	file, err := os.OpenFile(fileName, os.O_RDWR|os.O_CREATE, 0755)
	if err != nil {
		fmt.Println("> Ocurrio un error al generar el archivo dot,", err)
	} else {
		//Escribe texto línea por línea
		defer file.Close()
		_, err2 := file.WriteString(data)
		if err2 != nil {
			fmt.Println("> Ocurrio un error al escribir en el archivo,", err2)
		} else {
			save := file.Sync()
			if save != nil {
				fmt.Println("> Ocurrio un error al guardar el archivo,", save)
			}
		}
	}
	//defer file.Close()
}

// Convierte el archivo dot en imagen svg
func convertirDot(fileNameDot string, fileNameImage string) {
	//Busca el comando dot en la pc
	path, _ := exec.LookPath("dot")
	//Ejecuta comando de graphviz para converti
	cmd, _ := exec.Command(path, "-Tsvg", fileNameDot).Output()
	//Permisos del archivo
	mode := 0777
	//Escribe el archivo
	err := os.WriteFile(fileNameImage, cmd, os.FileMode(mode))
	if err == nil {
		fmt.Println("> Reporte generado exitosamente")
	} else {
		fmt.Println("> Ocurrio un error al convertir el archivo dot", err)
	}
}

func GenerarJSON(fileName string, doublyLL *DoublyLinkedList) {
	file, err := os.OpenFile(fileName, os.O_RDWR|os.O_CREATE, 0755)
	if err != nil {
		fmt.Println("> Ocurrio un error al generar el archivo json,", err)
	} else {
		defer file.Close()
		var fullName string
		var students []studentJSON

		//Convierte cada estudiante de la lista doble en un objeto JSON y lo agrega al array de estudiantes
		tmp := doublyLL.first
		for tmp != nil {
			fullName = tmp.name + " " + tmp.lastName
			students = append(students, studentJSON{Nombre: fullName, Carnet: tmp.carnet, Password: tmp.password, Carpeta: "/"})
			tmp = tmp.next
		}

		// Se guarda el array de estudiantes como array de objetos JSON
		data := studentsArrayJSON{students}
		// Codificando la información como formato json
		jsonData, _ := json.MarshalIndent(data, "", "\t")
		//Convierte el arreglo de bytes a texto en formato json
		jsonDataString := string(jsonData)

		_, err2 := file.WriteString(jsonDataString)
		if err2 != nil {
			fmt.Println("> Ocurrio un error al escribir en el archivo,", err2)
		} else {
			save := file.Sync()
			if save != nil {
				fmt.Println("> Ocurrio un error al guardar el archivo,", save)
			} else {
				fmt.Println("> Reporte JSON generado exitosamente")
			}
		}
	}
	//defer file.Close()
}
