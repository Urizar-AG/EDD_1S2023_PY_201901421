package Estructuras

import (
	"fmt"
	"strconv"
)

type NodeD struct {
	carnet   int
	name     string
	lastName string
	password string
	Bitacora *Stack
	next     *NodeD
	prev     *NodeD
}

type DoublyLinkedList struct {
	length int
	first  *NodeD
	last   *NodeD
}

func (d *DoublyLinkedList) AddSort(carnet int, name string, lastName string, password string) {
	newNode := &NodeD{carnet: carnet, name: name, lastName: lastName, password: password, next: nil, prev: nil}
	newNode.Bitacora = NewStack() //Inicializa la bitacora del estudiante
	//La lista está vacía
	if d.IsEmpty() {
		d.first = newNode
		d.last = newNode
	} else {
		if carnet < d.first.carnet {
			//Insertar al inicio de la lista
			d.first.prev = newNode
			newNode.next = d.first
			d.first = newNode
		} else if carnet > d.last.carnet {
			//Insertar al final de la lista
			d.last.next = newNode
			newNode.prev = d.last
			d.last = newNode
		} else {
			//Insertar entre dos nodos de la lista
			tmp := d.first
			for tmp != nil && tmp.carnet < carnet {
				tmp = tmp.next
			}
			tmp.prev.next = newNode
			newNode.next = tmp
			newNode.prev = tmp.prev
			tmp.prev = newNode
		}
	}
	d.length++
}

// Búsqueda por valor
func (d *DoublyLinkedList) SearchStudent(carnet int, password string) (*NodeD, bool) {
	tmp := d.first
	for tmp != nil {
		if tmp.carnet == carnet {
			if tmp.password == password {
				//Las credenciales son correctas
				return tmp, true
			}
			//El carnet coincide pero la contraseña no
			return tmp, false
		}
		tmp = tmp.next
	}
	//No encontro ninguna coincidencia
	return nil, false
}

func (d *DoublyLinkedList) PrintStudents() {
	tmp := d.first
	fmt.Println("########################################")
	fmt.Println("         Listado de Estudiantes         ")
	fmt.Printf("               Total: %d                \n", d.length)
	fmt.Println("########################################")
	for tmp != nil {
		fmt.Printf("Carnet: %d, Nombre: %s %s \n", tmp.carnet, tmp.name, tmp.lastName)
		fmt.Println("########################################")
		tmp = tmp.next
	}
}

func (d *DoublyLinkedList) IsEmpty() bool {
	return d.length == 0
}

func (d *DoublyLinkedList) GraphDoublyLinkedList() {
	nameDot := "./Estudiantes.dot"
	nameImage := "Estudiantes.svg"
	text := "digraph DLL {\n"
	text += "label=\"Estudiantes en el Sistema\";\n"
	text += "labelloc=\"t\";\n"
	text += "node[shape=rectangle style=filled width=2.2];\n"
	text += "nodesep=1.0\n"
	text += "nA[label=\"null\"];\n"
	text += "nB[label=\"null\"];\n"

	var fullName string
	var text2 string = ""
	var text3 string = ""
	var text4 string = "{rank=same; nA;nB;"
	tmp := d.first
	//Escribiendo los nodos de la lista
	for i := 0; i < d.length; i++ {
		fullName = tmp.name + " " + tmp.lastName
		text = text + "n" + strconv.Itoa(i) + "[label=\"" + strconv.Itoa(tmp.carnet) + `\n` + fullName + "\" group=" + strconv.Itoa(i) + "];\n"
		text4 = text4 + "n" + strconv.Itoa(i) + ";"
		//Agrega la bitácora del estudiante
		if tmp.Bitacora.top != nil {
			tmp2 := tmp.Bitacora.top
			//Enlaza el nodo de la lista con su pila
			text3 = text3 + "n" + strconv.Itoa(i) + "->N" + strconv.Itoa(i) + ";\n"
			//Crea el nodo top de la pila
			text2 = text2 + "N" + strconv.Itoa(i) + "[label=\"{" + tmp2.description + `\n` + tmp2.sesion
			//Escribe el resto de los nodos de la pila si existen
			if tmp2.next != nil {
				tmp2 = tmp2.next
				for tmp2 != nil {
					text2 = text2 + "|" + tmp2.description + `\n` + tmp2.sesion
					tmp2 = tmp2.next
				}
			}
			text2 += "}\" group=" + strconv.Itoa(i) + " shape=record];\n"
		}
		tmp = tmp.next
	}

	//Enlazando nodos de la lista
	var j int
	var cont int
	for i := 0; i < d.length-1; i++ {
		j = i + 1
		text = text + "n" + strconv.Itoa(i) + "->n" + strconv.Itoa(j) + " [dir=back];\n"
		text = text + "n" + strconv.Itoa(j) + "->n" + strconv.Itoa(i) + " [dir=back];\n"
		cont = j
	}
	text += "nA->n0 [dir=back];\n"
	text = text + "n" + strconv.Itoa(cont) + "->nB;\n"
	text4 += "};\n"
	text3 += text4
	text2 += text3
	text += text2
	text += "}"

	generarDot(nameDot, text)
	convertirDot(nameDot, nameImage)
}

// Crear una lista doble
func NewDoublyLinkedList() *DoublyLinkedList {
	return &DoublyLinkedList{0, nil, nil}
}
