//agrupar todo's en listas

export class TodoList{

    constructor(){

        //this.todos = [];
        this.cargarLocalStorage();


    }

//recibir e insertar en el arreglo todos 
    nuevoTodo (todo){
        this.todos.push( todo )
        this.guardarLocalStorage();
    }

    eliminarTodo( id ){
    //uso del metodo filer, nuevo arreglo con todos los elemnentos quer cumplen la condicion
    this.todos = this.todos.filter(todo => todo.id != id);
    //borramos y lo tenemos almacenado en localS
    this.guardarLocalStorage();
    }

    marcarCompletado( id ){

        for ( const todo of this.todos ){

            console.log(id, todo.id);

            if (todo.id == id) {

                todo.completado = !todo.completado;
                //modificacion al todo, se guarda
                this.guardarLocalStorage();


                break;
            }

        }
    }

    eliminarCompletados(){
        //eliminar todos los todos que no estan completados
        this.todos = this.todos.filter(todo => !todo.completado);

    }
    
    guardarLocalStorage(){
        // segundo parametro solo admite
        // [onject object] => un objeto en forma de strings
        //JSON.stringify() convertir arrglo todos en json
        localStorage.setItem('todo',JSON.stringify( this.todos ));
    }

    cargarLocalStorage(){
        //cobvertir de string a objeto
        this.todos = ( localStorage.getItem('todo')) ? 
                    JSON.parse(localStorage.getItem('todo')) : //todos is a string now
                    [];
    }


}