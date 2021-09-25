

export class Todo {


    constructor(tarea){
        this.tarea = tarea;

        this.id = new Date().getTime();/* hora,minutos,segundos actual */
        this.completado = false; //bool
        this.creado = new Date();

    }
}