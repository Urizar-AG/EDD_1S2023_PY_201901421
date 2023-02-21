package Estructuras

import "fmt"

type NodeS struct {
	description string
	sesion      string
	next        *NodeS
}

type Stack struct {
	length int
	top    *NodeS
}

func (s *Stack) Push(description string, sesion string) {
	newNode := &NodeS{description, sesion, nil}
	if s.IsEmpty() {
		s.top = newNode
	} else {
		newNode.next = s.top
		s.top = newNode
	}
	s.length++
}

func (s *Stack) Peek() *NodeS {
	tmp := s.top
	return tmp
}

func (s *Stack) IsEmpty() bool {
	return s.length == 0
}

func (s *Stack) PrintStack() {
	tmp := s.top
	fmt.Println("########################################")
	fmt.Println("                Bitácora                ")
	fmt.Println("########################################")
	for tmp != nil {
		fmt.Println(tmp.description, tmp.sesion)
		tmp = tmp.next
	}
	fmt.Println("########################################")
}

func (s *Stack) GraphStack() {
	nameDot := "./BitacoraAdministrador.dot"
	nameImage := "BitacoraAdministrador.svg"
	text := "digraph P {\n"
	text += "label=\"Bitácora del Administrador\";\n"
	text += "labelloc=\"t\";\n"
	text += "rankdir=TB;\n"
	text += "node[shape=record style=filled width=2.2]\n"
	text += "n0[label=\"Top\"];\n"
	text += "n1[label=\"{"
	text = text + s.top.description + `\n` + s.top.sesion
	tmp := s.top.next
	for tmp != nil {
		text = text + "|" + tmp.description + `\n` + tmp.sesion
		tmp = tmp.next
	}
	text += "}\"];\n"
	text += "n0->n1;\n}"
	generarDot(nameDot, text)
	convertirDot(nameDot, nameImage)
}

// Crear una pila
func NewStack() *Stack {
	return &Stack{0, nil}
}
