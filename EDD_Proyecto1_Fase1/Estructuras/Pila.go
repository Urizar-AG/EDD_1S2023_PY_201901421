package Estructuras

import "fmt"

type NodeS struct {
	Description string
	Sesion      string
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
		fmt.Println(tmp.Description, tmp.Sesion)
		tmp = tmp.next
	}
	fmt.Println("########################################")
}

// Crear una pila
func NewStack() *Stack {
	return &Stack{0, nil}
}
