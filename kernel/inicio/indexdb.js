
const codeIndexDb = window.indexedDB


class CodeIndexDB {

    constructor(){
        this.db
        this.conectar()
    }

    conectar(){
        if (codeIndexDb) {
            const peticion = codeIndexDb.open("CodeEpic", 1)
        
            peticion.onsuccess = () => {
                this.db = peticion.result
                console.warn('Abriendo Base de datos ', this.db)
                
                
            }
        
            peticion.onupgradeneeded = () => {
                this.db = peticion.result
                console.warn('Creando Base de datos ', this.db)
                this.crearObjeto()
            }
        
            peticion.onerror = (err) => {
                console.error('Error con la conexión de la base de datos ', err)
            }
        }
    }
 

    crearObjeto(){
       const objeto = this.db.createObjectStore("Actividades-v1")
    }
}

module.exports = {  
    CodeIndexDB: CodeIndexDB
}