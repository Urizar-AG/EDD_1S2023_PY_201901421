//import { CircularLinkedList } from "./ListaCircular.js"
//import { nodeNAry, NAryTree } from "./ArbolNArio.js";

class nodeAVL {
    constructor(name, carnet, password, rootDirectory) {
        //Atributos del usuario
        this.name = name
        this.carnet = carnet
        this.password = password
        this.rootDirectory = rootDirectory
        //this.activityLogs = new CircularLinkedList()
        //this.folders = new NAryTree()

        //Atributos propios del árbol
        this.height = 0
        this.left = null
        this.right = null
    }
}

class AVL {
    constructor() {
        this.root = null
    }

    add(name, carnet, password, rootDirectory) {
        this.root = this._add(this.root, name, carnet, password, rootDirectory)
    }

    //Agregar recursivo
    _add(node, name, carnet, password, rootDirectory) {
        if (node === null) {
            node = new nodeAVL(name, carnet, password, rootDirectory)
            return node
        }else {
            if (node.carnet > carnet) { //id < node.id
                node.left = this._add(node.left, name, carnet, password, rootDirectory)
                //El árbol no está balanceado, hace rotación
                if (this.getHeight(node.right) - this.getHeight(node.left) === -2) {
                    if (node.left.carnet > carnet) {
                        //Rotación simple por la derecha
                        node = this.RSD(node)
                    }else {
                        //Rotación doble por la izquierda
                        node = this.RDI(node)
                    }
                }
            }else if (node.carnet < carnet) {  //id node.id
                node.right = this._add(node.right, name, carnet, password, rootDirectory)
                //El árbol no está balanceado, hace rotación 
                if (this.getHeight(node.right) - this.getHeight(node.left) === 2) {
                    if (node.right.carnet < carnet) {
                        //Rotación simple por la izquierda
                        node = this.RSI(node)
                    }else {
                        //Rotación doble por la derecha
                        node = this.RDD(node)
                    }
                }
            }else {
                //Ya existe el nodo a agregar
                console.log("El carnet " + node.carnet.toString() + " ya existe en el sistema");
            }
        }
        //La altura es el camino más largo, desde el nodo a una hoja
        node.height = Math.max(this.getHeight(node.right), this.getHeight(node.left)) + 1
        return node
    }

    /*
        Rotación simple por la derecha
            3
           /
          2              -->           2
         /                            / \
        1                            1   3    
    */
    RSD(node) {
        let aux = node.left
        node.left = aux.right
        aux.right = node

        node.height = Math.max(this.getHeight(node.right), this.getHeight(node.left)) + 1
        aux.height = Math.max(this.getHeight(aux.left), node.height) + 1
        return aux
    }

    /*
        Rotación simple por la izquierda
        1                
         \        
          2              -->           2  
           \                          / \     
            3                        1   3       
    */
    RSI(node) {
        let aux = node.right
        node.right = aux.left
        aux.left = node

        node.height = Math.max(this.getHeight(node.right), this.getHeight(node.left)) + 1
        aux.height = Math.max(this.getHeight(aux.right), node.height) + 1
        return aux
    }

    /* 
        Rotación doble por la izquierda
          3                       3 
         /                       / 
        1           -->         2          -->             2
         \                     /                          / \
          2                   1                          1   3    
    */
    RDI(node) {
        node.left = this.RSI(node.left)
        return this.RSD(node)
    }

    /*
        Rotación doble por la derecha
        1                      1 
         \                      \ 
          3         -->          2         -->          2
         /                        \                    / \
        2                          3                  1   3    
    */
    RDD(node) {
        node.right = this.RSD(node.right)
        return this.RSI(node)
    }
    
    getById(node, id) {
        let aux = null
        if (node === null) {
            aux = null
        }else {
            //El id coincide con el nodo
            if (node.carnet === id) {
                aux = node
                // return aux
            }else if (node.carnet > id) {
                //El id buscado es menor al id del nodo en iteración, busca al lado izquierdo
                aux = this.getById(node.left, id)
            } else if (node.carnet < id){
                //El id buscado es mayor al id del nodo en iteración, busca al lado derecho
                aux = this.getById(node.right, id)
            }
        }
        return aux
    }

    getHeight(node) {
        return node != null ? node.height : -1
    }

    getDot(){
        let dot = ""
        if (this.root != null) {
            dot = "digraph arbol{\n"
            dot += "node[shape=\"rectangle\" width=2];\n"
            dot = dot + this.writeDot(this.root, 0)
            dot = dot + "}"
        }
        //console.log(dot);
        return dot
    }

    writeDot(node, numero) {
        let dot = ""
        let cnt = numero + 1 // Cantidad de nodos extras creados
        if (node != null) {
            dot += "\""
            dot += node.carnet.toString()
            dot += " \\n "
            dot += node.name
            dot += " \\n "
            dot = dot + "Altura: " + node.height.toString()
            dot += "\";"
            if (node.left != null && node.right != null) {
                dot += "n" + cnt.toString() + "[label=\"\", style=invis];"
                dot += "\""
                dot += node.carnet.toString()
                dot += " \\n "
                dot += node.name
                dot += " \\n "
                dot = dot + "Altura: " + node.height.toString()
                dot += "\" -> "
                dot += this.writeDot(node.left, cnt)
                dot += "\""
                dot += node.carnet.toString()
                dot += " \\n "
                dot += node.name
                dot += " \\n "
                dot = dot + "Altura: " + node.height.toString()
                dot += "\" -> "
                dot += this.writeDot(node.right, cnt)
                dot = dot + "{rank=same \"" + node.left.carnet.toString() + " \\n " + node.left.name + " \\n " + "Altura: " + node.left.height.toString() + "\""
                          + " -> \"" 
                          + node.right.carnet.toString() + " \\n " + node.right.name + " \\n " + "Altura: " + node.right.height.toString() + "\" " 
                          + "[style=invis]};"
            }else if (node.left != null && node.right === null) {
                dot += "n" + cnt.toString() + "[label=\"\", style=invis];"
                dot += "\""
                dot += node.carnet.toString()
                dot += " \\n "
                dot += node.name
                dot += " \\n "
                dot = dot + "Altura: " + node.height.toString()
                dot += "\" -> "
                dot += this.writeDot(node.left, cnt)
                dot += "\""
                dot += node.carnet.toString()
                dot += "\\n "
                dot += node.name
                dot += " \\n "
                dot = dot + "Altura: " + node.height.toString()
                dot += "\" -> "
                dot += "n" + cnt.toString() + "[style=invis];"
                dot = dot + "{rank=same \"" + node.left.carnet.toString() + " \\n " + node.left.name + " \\n " + "Altura: " + node.left.height.toString() + "\""
                          + " -> n" + cnt.toString() + "[style=invis]};" 
            }else if (node.left === null && node.right != null) {
                dot += "n" + cnt.toString() + "[label=\"\", style=invis];"
                dot += "\""
                dot += node.carnet.toString()
                dot += " \\n "
                dot += node.name
                dot += " \\n "
                dot = dot + "Altura: " + node.height.toString()
                dot += "\" -> "
                dot += "n" + cnt.toString() + "[style=invis];"
                dot += "\""
                dot += node.carnet.toString()
                dot += " \\n "
                dot += node.name
                dot += " \\n "
                dot = dot + "Altura: " + node.height.toString()
                dot += "\" -> "
                dot += this.writeDot(node.right, cnt)
                dot = dot + "{rank=same n" + cnt.toString() + " -> \"" 
                          + node.right.carnet.toString() + " \\n " + node.right.name + " \\n " + "Altura: " + node.right.height.toString() + "\" " 
                          + "[style=invis]};"               
            }
        }
        return dot
    }   
}

export { nodeAVL, AVL }
