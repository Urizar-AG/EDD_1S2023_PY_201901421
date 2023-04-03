class nodeNAry {
    constructor(name, id) {
        this.name = name //Nombre de la carpeta
        this.id = id //Auxiliar para generar el gráfico
        this.next = null //Nodo siguiente
        this.first = null //Apuntador al primer nodo de la lista
    }
}

class NAryTree {

    constructor() {
        this.root = new nodeNAry("/", 0)
        this.total = 1 //total de nodos que tiene el árbol
    }

    add(path, name) {
        let ls = path.split('/') // /Documentos/Cursos -> ['', Documentos, Cursos]
        let exists = this.search(ls, name)
        let res = null // null no se pudo añadir la carpeta, caso contrario, retorna el nombre de la carpeta
        switch (exists) {
            case 1:
                res = this.add(path, "Copia " + name)
                break;
            case 2:
                this.addNode(ls, name);
                res = name
                //alert("Carpeta creada exitosamente")
                break;
            case 3:
                //alert("El directorio no es valido, no fue posible crear la carpeta ");
                res = null
                break;
            case 4:
                res = null
                //alert("El directorio no es valido, no fue posible crear la carpeta");
                break;
            case 5:
                this.addNode(ls, name);
                res = name
                //alert("Carpeta creada exitosamente")
                break;
            default:
                res = null
                alert("Ocurrio un error, no fue posible agregar la carpeta");
                break;
        }
        return res
    }

    addNode(ls, name) {
        let newNode = new nodeNAry(name, this.total)
        this.total++
        //La carpeta a crear es en la raíz y la raíz no tiene ninguna carperta
        if (ls[1] === "" && this.root.first === null) {
            this.root.first = newNode;
        }
        //La carpeta a crear es en la raíz y ya existen carpetas en la raíz
        else if (ls[1] === "" && this.root.first !== null) {
            this.root = this.addSort(this.root, newNode)
        }
        //La carpeta a crear es en cualquier directorio que no sea la raíz
        else if (ls[1] !== "" && this.root.first !== null) {
            let tmp = this.root.first
            let pos = 1
            for (let i = 1; i < ls.length; i++) {
                if (tmp !== null) {
                    while (tmp) {
                        if (pos < ls.length && ls[pos] === tmp.name) {
                            pos++;
                            if (tmp.first !== null && pos < ls.length) {
                                tmp = tmp.first
                            }
                            break;
                        } else {
                            tmp = tmp.next
                        }
                    }
                } else {
                    break;
                }
            }
            //Si la carpeta padre no tiene carpetas, agrega al inicio
            if (tmp.first === null) {
                tmp.first = newNode
            }
            //La carpeta padre ya tiene carpetas
            else {
                tmp = this.addSort(tmp, newNode)
            }
        }
    }

    //Agrega los nodos en orden ascendente
    addSort(node, newNode) {
        let tmp = node.first
        //El nodo a gregar es menor
        if (newNode.name < node.first.name) {
            newNode.next = node.first
            node.first = newNode
            return node
        } else {
            while (tmp.next) {
                //Inserción entre 2 nodos
                if (newNode.name > tmp.name && newNode.name < tmp.next.name) {
                    newNode.next = tmp.next
                    tmp.next = newNode
                    return node
                }
                //El nodo a insertar es menor
                else if (newNode.name < tmp.name) {
                    newNode.next = tmp
                    tmp = newNode
                    return node
                }
                tmp = tmp.next
            }
            //El nodo a insertar es mayor que todos, inserta al final de la lista
            tmp.next = newNode
            return node
        }
    }


    /*
        Retornos de la función search
        1 -> La carpeta que se quiere crear ya existe, crea una copia
        2 -> La carpeta que se quiere crear no existe, se puede crear
        3 -> La carpeta a crear es en algun directorio pero la raíz no tiene ninguna carpeta
        4 -> La ruta/carpeta a la que se quiere acceder no existe
        5 -> La carpeta a crear es en la raiz pero la raíz no tiene ninguna carpeta, se puede crear
    */
    search(ls, name) {
        //La carpeta a crear es en la raíz y esta ya tiene carpetas creadas, busca si existe o no
        if (ls[1] === "" && this.root.first !== null) {
            let tmp = this.root.first
            while (tmp) {
                if (tmp.name === name) {
                    return 1 //Ya existe la carpeta
                }
                tmp = tmp.next
            }
            return 2 //No existe la carpeta, se puede crear            
        }
        //La carpeta a crear es en la raíz y esta no tiene ninguna carpeta creada
        else if (ls[1] === "" && this.root.first === null) {
            return 5 //No existe la carpeta, se puede crear
        }
        //La carpeta a crear es en algun directorio  pero la raiz no posee ninguna carpeta
        else if (ls[1] !== "" && this.root.first === null) {
            return 3
        }
        //Busca en el directorio padre y revisa si en sus hijos existe o no la carpeta
        else if (ls[1] !== "" && this.root.first !== null) {
            let pos = 1 //Nivel del árbol en el que se está buscando
            let tmp = this.root.first
            //La longitud del array es la cantidad de niveles que hay que bajar para buscar la carpeta
            for (let i = 1; i < ls.length; i++) {
                if (tmp !== null) {
                    while (tmp) {
                        //Encontro en el directorio actual una coincidencia
                        if (pos < ls.length && ls[pos] === tmp.name) {
                            pos++;
                            //pos es menor entonces aun debe seguir bajando en el árbol
                            if (tmp.first !== null && pos < ls.length) {
                                //Se mueve al hijo del padre en iteración
                                tmp = tmp.first
                            }
                            break;
                        } else {
                            tmp = tmp.next;
                        }
                    }
                }
                //No hay carpetas creadas dentro de la carpeta
                else {
                    break;
                }
            }
            if (tmp !== null) {
                tmp = tmp.first
                while (tmp) {
                    if (tmp.name === name) {
                        return 1 //La carpeta ya existe
                    }
                    tmp = tmp.next
                }
                return 2 //No existe la carpeta, se puede crear
            } else {
                return 4 //El directorio al que se quiere acceder no es valido/no existe
            }
        }
    }

    /* ----------------------------------------------------- MÉTODOS PARA OBTENER UN NODO DEL ÁRBOL ------------------------------------- */

    //Devuelve la carpeta buscada si la encuentra
    getDir(path) {
        let ls = path.split('/') // /Documento/Universidad/Cursos -> ["", Documento, Universidad, Cursos]
        /*
            Elimina la última posición del arreglo porque esta posición corresponde al nodo que se está buscando,
            entonces el recorrido de búsqueda en los niveles debe llegar a n-1, donde n son los niveles del árbol.
            Así de está forma desde n-1 buscar en el nivel n, que  es donde debe estar la carpeta buscada.
        */
        let name = ls.pop()
        if (name === "") {
            //Se está buscando en la raíz
            name = "/"
        }
        let aux = null
        aux = this.getNode(ls, name)
        
        // console.log("lo que encontre fue: ", aux)
        return aux
    }

    getNode(ls, name) {
        //La carpeta a obtener es la carpeta raíz
        if (ls.length === 1 && name === "/") {
            return this.root
        }
        //La carpeta a obtener está en la carpeta raíz
        else if (ls.length === 1 && name !== "/") {
            // console.log("laksdjflkjslfkjslkjflskjfl")
            let tmp = this.root.first
            while (tmp) {
                if (tmp.name === name) {
                    return tmp
                }
                tmp = tmp.next    
            }
            return null
        }else if (ls[1] !== "" && this.root.first === null) {
            return null
        }else if (ls[1] !== "" && this.root.first !== null) {
            let pos = 1 //Nivel del árbol en el que se está buscando
            let tmp = this.root.first
            //La longitud del array es la cantidad de niveles que hay que bajar para obtener la carpeta
            for (let i = 1; i < ls.length; i++) {
                if (tmp !== null) {
                    while (tmp) {
                        //Encontro en el directorio actual una coincidencia
                        if (pos < ls.length && ls[pos] === tmp.name) {
                            pos++;
                            //pos es menor entonces aun debe seguir bajando en el árbol
                            if (tmp.first !== null && pos < ls.length) {
                                //Se mueve al hijo del padre en iteración
                                tmp = tmp.first
                            }
                            break;
                        } else {
                            tmp = tmp.next;
                        }
                    }
                }
                //No hay carpetas creadas dentro de la carpeta
                else {
                    break;
                }
            }
            if (tmp !== null) {
                tmp = tmp.first
                while (tmp) {
                    if (tmp.name === name) {
                        return tmp
                    }
                    tmp = tmp.next
                }
                return null
            } else {
                return null
            }            
        }
    }

    /* ----------------------------------------------------- MÉTODOS PARA ELIMINAR UN NODO DEL ÁRBOL ------------------------------------- */
    removeDir(path, name) {
        let ls = path.split('/')
        let exists = this.search(ls, name)
        let res = false // false no se elimino, true carpeta eliminada
        if (exists) {
            res = this.deleteNode(ls, name)
            //return res
        }
        return res
    }

    deleteNode(ls, name) {
        //La carpeta a eliminar es la carpeta raíz
        if (ls[1] === "" && name === "/") {
            return false
        }
        //La carpeta a eliminar está en la carpeta raíz
        else if (ls[1] === "" && name !== "/") {
            //Se asegura que  carpeta si contenga carpetas adentro
            if (this.root.first !== null) {
                //El nodo a eliminar es el primer nodo de la lista
                if (this.root.first.name === name) {
                    let tmp = this.root.first
                    this.root.first = tmp.next
                    tmp.next = null
                    // this.total -= 1
                    return true
                }
                //El nodo a eliminar es cualquier nodo diferente del primero
                else {
                    let prev = this.root.first
                    let tmp = this.root.first.next
                    while (tmp) {
                        if (tmp.name === name) {
                            break;
                        }
                        prev = tmp
                        tmp = tmp.next
                    }
                    if (tmp !== null) {
                        prev.next = tmp.next
                        tmp.next = null
                        // this.total -= 1
                        return true
                    }
                    return false
                }                 
            }
            return false
        }
        //La carpeta a eliminar es algun directorio dentro del árbol que no es hijo directo de la carpeta raíz
        else if (ls[1] !== "" && this.root.first !== null) {
            
            let pos = 1 //Nivel del árbol en el que se está buscando
            let tmp = this.root.first
            //La longitud del array es la cantidad de niveles que hay que bajar para buscar la carpeta
            for (let i = 1; i < ls.length; i++) {
                if (tmp !== null) {
                    while (tmp) {
                        //Encontro en el directorio actual una coincidencia
                        if (pos < ls.length && ls[pos] === tmp.name) {
                            pos++;
                            //pos es menor entonces aun debe seguir bajando en el árbol
                            if (tmp.first !== null && pos < ls.length) {
                                //Se mueve al hijo del padre en iteración
                                tmp = tmp.first
                            }
                            break;
                        } else {
                            tmp = tmp.next;
                        }
                    }
                }
                //No hay carpetas creadas dentro de la carpeta
                else {
                    break;
                }
            }
            if (tmp !== null) {
                //tmp = tmp.first
                //Se asegura que la carpeta si contega carpetas dentro
                if (tmp.first !== null) {
                    //El nodo a eliminar es el primer nodo de la lista
                    if (tmp.first.name === name) {
                        let aux = tmp.first
                        tmp.first = aux.next
                        //tmp.next = null
                        // this.total -= 1
                        return true
                    }
                    //El nodo a eliminar no es el primer nodo de la lista
                    else {
                        let prev = tmp.first
                        let aux = tmp.first.next
                        while (aux) {
                            if (aux.name === name) {
                                break;
                            }
                            prev = aux
                            aux = aux.next
                        }
                        if (aux !== null) {
                            prev.next = aux.next
                            aux.next = null
                            // this.total -= 1
                            return true
                        }
                        return false
                    }     
                }
                return false
            } else {
                return false
            }            
        }        
    }


    /* ----------------------------------------------------- MÉTODOS PARA GRAFICAR EL ÁRBOl ------------------------------------- */
    getDot() {
        let dot = ""
        if (this.root !== null) {
            dot += "digraph g {"
            dot = dot + this.getValues()
            dot += "}"
        }
        // console.log(dot)
        return dot
    }

    //Agrega el nodo padre y obtiene el resto de nodos del árbol
    getValues() {
        let dot = "node[shape=record]; "
        dot = dot + "n0" + "[label=\"" + this.root.name + "\"]"
        dot += this.getNextValues(this.root.first)
        dot += this.mergeBranches(this.root.first, 0)
        return dot
    }

    //Calcula los nodos distintos del nodo raíz del árbol
    getNextValues(node) {
        let dot = ""
        let tmp = node //Nodo en iteración
        if (tmp !== null) {
            //Agrega los nodos que están al mismo nivel de tmp
            while (tmp) {
                dot = dot + "n" + tmp.id + "[label=\"" + tmp.name + "\"] "
                tmp = tmp.next
            }
            tmp = node
            //Para cada nodo en nivel baja al siguiente nivel y agrega los nodos, sucesivamente, hasta llegar a null
            while (tmp) {
                dot += this.getNextValues(tmp.first)
                tmp = tmp.next
            }
        }
        return dot
    }

    //Agrega la conexión correspondiente de los nodos del árbol
    mergeBranches(node, cnt) {
        //contador es el número(id) del padre de dondev viene el nodo en iteración
        let dot = ""
        let tmp = node
        if (tmp !== null) {
            while (tmp) {
                dot = dot + "n" + cnt + " -> n" + tmp.id + " "
                tmp = tmp.next
            }
            tmp = node
            while (tmp) {
                dot += this.mergeBranches(tmp.first, tmp.id)
                tmp = tmp.next
            }
        }
        return dot
    }

}

export { nodeNAry, NAryTree }
