package Estructuras

type NodeS struct {
	Description string
	Sesion      string
	next        *NodeS
}

type Stack struct {
	Length int
	Top    *NodeS
}

func (s *Stack) Push(description string, sesion string) {
	newNode := &NodeS{description, sesion, nil}
	if s.IsEmpty() {
		s.Top = newNode
	} else {
		newNode.next = s.Top
		s.Top = newNode
	}
	s.Length++
}

func (s *Stack) Peek() *NodeS {
	tmp := s.Top
	return tmp
}

func (s *Stack) IsEmpty() bool {
	return s.Length == 0
}

// Crear una pila
func NewStack() *Stack {
	return &Stack{0, nil}
}
