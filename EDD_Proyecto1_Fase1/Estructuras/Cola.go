package Estructuras

import "fmt"

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

//Crear una Cola
func NewCola() *Queue {
	return &Queue{0, nil, nil}
}
