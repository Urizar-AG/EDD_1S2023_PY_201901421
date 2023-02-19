package Estructuras

import "fmt"

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

//Búsqueda por valor
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

//Crear una lista doble
func NewDoublyLinkedList() *DoublyLinkedList {
	return &DoublyLinkedList{0, nil, nil}
}
