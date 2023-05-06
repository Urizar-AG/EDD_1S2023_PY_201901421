
class NodeBlock {
    constructor(index, timeStamp, transmitter, receiver, message, previousHash, hash) {
        /* 
            index -> número que representa al bloque
            timeStamp -> fecha y hora de la creación del bloque
            transmitter -> emisor del mensaje
            receiver -> receptor del mensaje
            message -> mensaje encriptado
            previousHash -> hash del bloque anterior
            hash -> hash del bloque creado
        */
        this.value = {
            'index': index,
            'timeStamp': timeStamp,
            'transmitter': transmitter,
            'receiver': receiver,
            'message': message,
            'previousHash': previousHash,
            'hash': hash
        } 
        //Apuntadores del nodo
        this.next = null;
        this.prev = null;       
    }
}

class BlockChain {
    constructor() {
        this.first = null;
        this.blocksCreated = 0;
    }

    //Agregar un nuevo bloque a la blockchain
    async addBlock(date, transmitter, receiver, message) {
        if (this.first === null) { //Bloque  génesis
            const cadena = this.blocksCreated + date + transmitter + receiver + message;
            const hash = await this.sha256(cadena);
            const nuevoBloque = new NodeBlock(this.blocksCreated, date, transmitter, receiver, message, '0000', hash);
            this.first = nuevoBloque;
            this.blocksCreated++;
        }else {
            const cadena = this.blocksCreated + date + transmitter + receiver + message;
            const hash = await this.sha256(cadena);
            let aux = this.first;
            while (aux.next) {
                aux = aux.next;
            }
            const nuevoBloque = new NodeBlock(this.blocksCreated, date, transmitter, receiver, message, aux.value['hash'], hash);
            nuevoBloque.prev = aux;
            aux.next = nuevoBloque;
            this.blocksCreated++;             
        }
    }

    //Método para encriptar la contraseña con el algoritmo sha256
    async sha256(mensaje) {
        let encryptedMessage;
        const encoder = new TextEncoder();
        const mensajeCodificado = encoder.encode(mensaje);
        await crypto.subtle.digest("SHA-256", mensajeCodificado)
        .then((result) => {
            const hashArray = Array.from(new Uint8Array(result));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            encryptedMessage = hashHex;
        }).catch((err) => {
            encryptedMessage = mensaje;
        });
        return encryptedMessage;
    }

    //Escribe el código dot con los bloques de la blockchain
    getDot() {
        let dot = "";
        if (this.first !== null) {
            dot += "digraph G{";
            dot += "node[shape=rectangle style=filled];"
            dot += "label=\"BlockChain\";"
            dot += "labelloc=\"t\";"
            dot += "rankdir=TB;"
            let cnt = 0;
            let tmp = this.first
            while (tmp) {
                dot += "n" + cnt + `[label=\"TimeStamp = ${tmp.value.timeStamp}\\nEmisor: ${tmp.value.transmitter}\\nReceptor: ${tmp.value.receiver}\\nPreviousHash: ${tmp.value.previousHash}\"];`
                if (tmp.next !== null) {
                    dot += "n" + cnt + "->" + "n" + (1 + cnt) + ";"
                }
                tmp = tmp.next;
                cnt++;
            }
            dot += "}";
        }
        return dot;
    }
}

export { NodeBlock, BlockChain }