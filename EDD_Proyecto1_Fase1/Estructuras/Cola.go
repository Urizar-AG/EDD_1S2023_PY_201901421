package Estructuras

import (
	"fmt"
	"strconv"
)

type NodeQ struct {
	Carnet   int
	Name     string
	LastName string
	Password string
	next     *NodeQ
}

type Queue struct {
	Length int
	head   *NodeQ
	tail   *NodeQ
}

func (q *Queue) Enqueue(carnet int, name string, lastName string, password string) {
	newNodo := &NodeQ{carnet, name, lastName, password, nil}
	if q.IsEmpty() {
		q.head = newNodo
		q.tail = newNodo
	} else {
		tmp := q.tail
		q.tail = newNodo
		tmp.next = q.tail
	}
	q.Length++
	fmt.Printf("> Se registro el carnet %d en la cola de pendientes", carnet)
	fmt.Println()
}

func (q *Queue) Dequeue() {
	if q.head == q.tail {
		q.head = nil
		q.tail = nil
	} else {
		tmp := q.head
		q.head = tmp.next
		tmp.next = nil
	}
	q.Length--
}

func (q *Queue) Peek() *NodeQ {
	tmp := q.head
	return tmp
}

func (q *Queue) IsEmpty() bool {
	return q.Length == 0
}

func (q *Queue) SearchStudent(carnet int) bool {
	// Si la lista no está vacía
	if !(q.IsEmpty()) {
		tmp := q.head
		for tmp != nil {
			//Encontro coincidencia
			if tmp.Carnet == carnet {
				return true
			}
			tmp = tmp.next
		}
	}
	return false
}

func (q *Queue) PrintQueue() {
	tmp := q.head
	i := 0
	for tmp != nil {
		fmt.Printf("Usuario %d , Carnet: %d, Nombre: %s, Apellidos %s, Contraseña: %s", i, tmp.Carnet, tmp.Name, tmp.LastName, tmp.Password)
		fmt.Println()
		i++
		tmp = tmp.next
	}
}

func (q *Queue) GraphQueue() {
	nameDot := "./EstudiantesPendientes.dot"
	nameImage := "EstudiantesPendientes.svg"
	text := "digraph Q {\n"
	text += "label=\"Estudiantes Pendientes\";\n"
	text += "labelloc=\"t\";\n"
	text += "rankdir=LR;\n"
	text += "node[shape=record style=filled width=2.2]\n"
	text += "nA[label=\"null\"];\n"

	tmp := q.head
	var fullName string
	//Creando los nodos
	for i := 0; i < q.Length; i++ {
		fullName = tmp.Name + " " + tmp.LastName
		text = text + "n" + strconv.Itoa(i) + "[label=\"{" + strconv.Itoa(tmp.Carnet) + `\n` + fullName + "|}\"];\n"
		tmp = tmp.next
	}
	//Enlazando los nodos
	var j int
	var cont int
	for i := 0; i < q.Length-1; i++ {
		j = i + 1
		text = text + "n" + strconv.Itoa(i) + "->n" + strconv.Itoa(j) + ";\n"
		cont = j
	}
	text = text + "n" + strconv.Itoa(cont) + "->nA;\n"
	text += "}"

	generarDot(nameDot, text)
	convertirDot(nameDot, nameImage)
}

// Crear una Cola
func NewCola() *Queue {
	return &Queue{0, nil, nil}
}
