
class NodeHash {
    constructor(name, carnet, password, rootDirectory) {
        this.name = name;
        this.carnet = carnet;
        this.password = password;
        this.rootDirectory = rootDirectory;
    }
}

class HashTable {
    constructor() {
        this.table = new Array(7);
        this.capacity = 7; //Capacidad de la tabla
        this.used = 0; //Espacios ocupados de la capacidad actual
    }

    addNode(name, carnet, password, rootDirectory) {
        let index = this.calculateIndex(carnet);
        const newNode = new NodeHash(name, carnet, password, rootDirectory);
        if (index < this.capacity) {
            try {
                if (this.table[index] == null) {
                    this.table[index] = newNode;
                    this.used++;
                    this.checkCapacity();
                }else { //Existe colisión al momento de la inserción
                    let cnt = 1;
                    index = this.recalculateIndex(carnet, cnt);
                    //Se ejecuta hasta encontrar un espacio disponible
                    while (this.table[index] != null) {
                        cnt++;
                        index = this.recalculateIndex(carnet, cnt);
                    }
                    this.table[index] = newNode;
                    this.used++;
                    this.checkCapacity();
                }
            } catch (error) {
                console.log('Error al insertar nodo en la tabla hash');
                console.log(error);
            }
        }
    }

    //Convierte el carnet a un índice para la tabla hash
    calculateIndex(carnet) {
        let cadena = carnet.toString();
        let numero = 0; //Acumula la suma del valor ascii de cada dígito del carnet
        for (let i = 0; i < cadena.length; i++) {
            numero = numero + cadena.charCodeAt(i);
        }
        let index = numero % this.capacity;
        return index;
    }

    //Comprueba si se paso la capacidad de la tabla que es el 75% de ocupación
    checkCapacity() {
        let limite = this.capacity * 0.75; 
        if (this.used > limite) {
            this.capacity = this.calculateCapacity();
            this.used = 0;
            this.addAgain(); //Agrega los nodos nuevamente
        }
    }

    //Cálcula la nueva capacidad de la tabla, buscando el siguiente número primo al de la capacidad actual
    calculateCapacity() {
        let nuevaCapacidad = this.capacity + 1;
        //Se ejecuta hasta encontrar el siguiente número primo
        while (!this.isPrime(nuevaCapacidad)) {
            nuevaCapacidad++;
        }
        return nuevaCapacidad;
    }

    //Cálcula si el número es primo o no
    isPrime(numero) {
        for (let i = 2; i < numero; i++) {
            if (numero % i === 0) {
                return false;
            }
        }
        return true;
    }

    //Inserta los valores nuevamente al momento de hacer un rehashing
    addAgain(){
        const estudiantes = this.table; //Copia de la tabla actual
        this.table = new Array(this.capacity); //Crea la tabla ahora con la nueva capacidad
        // for (const estudiante of estudiantes) {
        //     this.addNode(estudiante.name, estudiante.carnet, estudiante.password, estudiante. rootDirectory)    
        // }
        estudiantes.forEach((estudiante) => {
            this.addNode(estudiante.name, estudiante.carnet, estudiante.password, estudiante.rootDirectory);
        });
    }

    //Cálcula el nuevo índice en donde insertar cuando existe una colisión
    recalculateIndex(carnet, intento) {
        let newIndex = this.calculateIndex(carnet) + intento * intento;
        let nuevo = this.calculateNewIndex(newIndex);
        return nuevo;
    }

    //Encuentra el nuevo índice en donde insertar
    calculateNewIndex(numero) {
        let newPosition = 0;
        if (numero < this.capacity) {
            newPosition = numero;
        }else {
            //El índice sobrepasa el tamaño de la tabla, se ejecuta recursivamente
            //para encontrar un índice menor al tamaño de la tabla
            newPosition = numero - this.capacity;
            newPosition = this.calculateNewIndex(newPosition);
        }
        return newPosition;
    }

    //Búsqueda de usuario por carnet
    getUser(carnet) {
        let index = this.calculateIndex(carnet);
        if (index < this.capacity) {
            try {
                if (this.table[index] == null) {
                    console.log('El usuario no existe');
                    return null;
                } else if(this.table[index] != null && this.table[index].carnet == carnet) {
                    console.log('Bienvenido usuario' + this.table[index].name);
                    return this.table[index];
                }else {
                    let cnt = 1;
                    index = this.recalculateIndex(carnet, cnt);
                    while (this.table[index] != null) {

                        if (this.table[index]?.carnet == carnet) {
                            console.log('Bienvenido usuario' + this.table[index].name);
                            return this.table[index];
                        }
                        cnt++;
                        index = this.recalculateIndex(carnet, cnt);
                    }
                    return null;
                }
            } catch (error) {
                console.log('Ocurrio un error en la búsqueda del usuario');
                console.log(error);
            }
        }        
    }
}

export { NodeHash, HashTable }
