class NodeCircular {
    constructor(description, date, time) {
        this.description = description
        this.date = date
        this.time = time
        this.next = null
    }
}

class CircularLinkedList {
    constructor() {
        this.head = null
        this.last = null
    }

    //Inserta un nodo al final de la lista
    add(description, date, time) {
        let newNode = new NodeCircular(description, date, time)
        if (this.head == null) {
            this.head = newNode
            this.last = newNode
            newNode.next = this.head
        }else {
            this.last.next = newNode
            this.last = newNode
            this.last.next = this.head
        }
    }

    //Recorre la lista escribiendo el código dot para graficar la lista
    writeDot() {
        let dot = ""
        if (this.head != null) {
            dot += "digraph G{\n"
            dot += "node[shape=rectangle style=filled width=2.2];\n"
            dot += "nodesep=1.0\n"

            let cnt = 0
            let aux = "{ rank=same; "
            let tmp = this.head
            //Escribiendo nodos
            do {
                dot += "n" + cnt.toString() + "[label=\"Acción: " + tmp.description + ` \\n ` + "Fecha: " + tmp.date 
                                            + ` \\n ` + "Hora: " + tmp.time +"\"];\n"
                aux += "n" + cnt.toString() + "; "
                tmp = tmp.next
                cnt++;
            } while (tmp != this.head)

            //Enlazando nodos
            for (let i = 0; i < cnt-1; i++) {
                dot += "n" + i.toString() + " -> " + "n" + (i+1).toString() + ";\n"
            }

            dot += "n" + (cnt-1).toString() + " -> n0;\n" //Enlaza el último nodo de la lista con el primer nodo
            aux += "}\n"
            dot += aux
            dot += "}"
        }
        return dot
    }
}

export {CircularLinkedList}
