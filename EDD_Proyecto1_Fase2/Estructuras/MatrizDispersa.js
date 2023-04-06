class nodeSparse {
    constructor(posX, posY, name) {
        this.name = name //Nombre del archivo | Carnet del alumno | tipo de permiso
        this.value = "" //contenido del archivo; txt -> contenido normal ; pdf o imagen -> contenido en base 64

        //Apuntadores del nodo
        this.posX = posX
        this.posY = posY
        this.next = null
        this.prev = null
        this.up = null
        this.down = null
    }
}

class sparseMatrix {
    constructor(folder) {
        //folder: nombre de la carpeta donde están los archivos
        this.root = new nodeSparse(-1, -1, folder)
        this.x = 0 //Cantidad de columnas de la matriz
        this.y = 0 //Cantidad de filas de la matriz
    }

    //Busca si el nodo (archivo) ya existe en la fila de cabeceras (archivos)
    getRow(name) {
        let tmp = this.root
        while (tmp) {
            if (tmp.name === name) {
                return tmp
            }
            tmp = tmp.down
        }
        return null
    }

    //Busca el nodo (carnet) ya existe en la columan de cabeceras (carnets)
    getColumn(carnet) {
        let tmp = this.root
        while (tmp) {
            if (tmp.name === carnet) {
                return tmp
            }
            tmp = tmp.next
        }
        return null
    } 
    
    //Recorre las filas e inserta el nuevo elemento en la posición correspondiente
    addRow(pos, name) {
        const newNode = new nodeSparse(-1, pos, name)
        let tmp = this.root
        while (tmp.down) {
            if (newNode.posY > tmp.posY) {
                tmp = tmp.down    
            } else {
                //Inserción entre dos nodos
                newNode.down = tmp
                newNode.up = tmp.up
                tmp.up.down = newNode
                tmp.up = newNode
                return
            }
        }
        //Recorrio la lista y ningun elemento era menor, inserta al final
        newNode.up = tmp
        tmp.down = newNode
    }

    //Recorre las columnas e inserta el nuevo elemento en la posición correspondiente
    addColumn(pos, carnet) {
        const newNode = new nodeSparse(pos, -1, carnet)
        let tmp = this.root
        while (tmp.next) {
            if (newNode.posX > tmp.posX) {
                tmp = tmp.next
            } else {
                //Inserción entre dos nodos
                newNode.next = tmp
                newNode.prev = tmp.prev
                tmp.prev.next = newNode
                tmp.prev = newNode
                return
            }
        }
        //Recorrio la lista y no encontro coincidencia, inserta al final
        newNode.prev = tmp
        tmp.next = newNode
    }

    //Agrega el nodo correspondiente al permiso archivo/carnet
    addNode(x, y, permission) {
        const newNode = new nodeSparse(x, y, permission)
        let tmpX = this.root
        let tmpY = this.root
        //Enlazando en la columna
        while (tmpX.next) {
            if (tmpX.posX === newNode.posX) {
                //tmpY.name = permiso
                break;
            }
            tmpX = tmpX.next
        }
        while (true) {
            //Ya existe el valor en las filas de la columna
            if (tmpX.posY === newNode.posY) {
                tmpX.name = permission
                break;
            }
            //El nodo a insertar va entre 2 nodos
            else if(tmpX.down !== null && tmpX.down.posY > newNode.posY) {
                newNode.down = tmpX.down
                newNode.up = tmpX
                tmpX.down = newNode
                break;
            }
            //La columna está vacía
            else if(tmpX.down === null) {
                newNode.up = tmpX
                newNode.down = tmpX.down
                tmpX.down = newNode
                break;
            }
            tmpX = tmpX.down
        }

        //Enlazando en la fila
        while (tmpY.down) {
            if (tmpY.posY === newNode.posY) {
                break;
            }
            tmpY = tmpY.down
        }
        while (true) {
            //Ya existe el elemento en la columna
            if (tmpY.posX === newNode.posX) {
                tmpY.name = permission
                break;
            }
            //El nodo a insertar va entre 2 nodos
            else if(tmpY.next !== null && tmpY.next.posX > newNode.posX) {
                newNode.next = tmpY.next
                newNode.prev = tmpY
                tmpY.next = newNode
            }
            //La columna está vaçía
            else if (tmpY.next === null) {
                newNode.prev = tmpY
                newNode.next = tmpY.next
                tmpY.next = newNode
            }
            tmpY = tmpY.next
        }
    }

    addFile(name, numero) {
        let res = null
        let newRow = this.getRow(name)
        if (newRow === null) {
            this.addRow(this.y, name)
            this.y++
            res = name
        }else {
            //El archivo ya existe, crea una copia
            let nameSplit = name.split('.')
            let aux = ""
            if (nameSplit[0].includes("(")) {
                let tmp = nameSplit[0]
                tmp = tmp.slice(0, tmp.length-3)
                aux = tmp + "(" + (numero++) + ")" + "." + nameSplit[1] 
                
            }else {
                aux = nameSplit[0] + "(" + (numero++) + ")" + "." + nameSplit[1]
            }
            res = this.addFile(aux, numero)
        }
        return res
    }

    addPermission(file, carnet, permission) {
        let newColumn = this.getColumn(carnet)
        let newRow = this.getRow(file)
        //El carnet aún no existe dentro de la matriz
        if (newColumn === null) {
            //Crea la columna
            this.addColumn(this.x, carnet)   
            this.x++
            //Recupera la columna
            newColumn = this.getColumn(carnet)         
        }
        //Existe la fila(archivo) y también existe la columna(carnet)
        if (newRow !== null && newColumn !== null) {
            this.addNode(newColumn.posX, newRow.posY, permission)
            return true
        }
        return false
    }

    getDot() {
        let dot = ""
        let tmp = this.root
        let tmp2 = this.root   
        let tmp3 = this.root
        if (tmp != null) {
            dot += "digraph G { node[shape=rectangle]; nodesep=0.6; ranksep=0.6; rankdir=UD; {rank=min; "
            /* --- Creación de los nodos --- */
            while (tmp) {
                dot = dot + "n" + (tmp.posX+1) + (tmp.posY+1) + "[label=\"" + tmp.name 
                          + "\" ,rankdir=LR,group=" + (tmp.posX+1) + "]; "
                tmp = tmp.next
            }
            dot += "}"
            //Recorre las filas, agregando las columnas de cada fila
            while (tmp2) {
                tmp = tmp2
                dot += "{rank=same; "
                while (tmp) {
                    dot = dot + "n" + (tmp.posX+1) + (tmp.posY+1) + "[label=\"" + tmp.name
                              + "\" ,group=" + (tmp.posX+1) + "]; "
                    tmp = tmp.next
                }
                dot += "}"
                tmp2 = tmp2.down
            } 
            /* --- Conexión entre nodos --- */

            //Enlazando las columnas
            tmp2 = tmp3
            while (tmp2) {
                tmp = tmp2
                while (tmp.next) {
                    dot = dot + "n" + (tmp.posX+1) + (tmp.posY+1) + " -> "
                              + "n" + (tmp.next.posX+1) + (tmp.next.posY+1) + " [dir=both];"
                    tmp = tmp.next          
                }
                tmp2 = tmp2.down
            }
            //Enlazando las filas
            tmp2 = tmp3
            while (tmp2) {
                tmp = tmp2
                while (tmp.down) {
                    dot = dot + "n" + (tmp.posX+1) + (tmp.posY+1) + " -> "
                    + "n" + (tmp.down.posX+1) + (tmp.down.posY+1) + " [dir=both];"
                    tmp = tmp.down
                } 
                tmp2 = tmp2.next   
            } 
            dot += "}"              
        }
        return dot
    }

}

export { nodeSparse, sparseMatrix }