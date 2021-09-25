import { Todo } from "../class";
import { todoList } from "../index";

//referencias en hml
const ulTodoList    = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo');
const btnBorrar     = document.querySelector('.clear-completed')
const ulfiltros     = document.querySelector('.filters')
const anchorFiltros = document.querySelectorAll ('.filters')


export const crearTodoHtml = ( todo ) =>{

    const htmlTodo = 
    `<li class="${ (todo.completado) ? 'completed' :''}" data-id=" ${ todo.id } ">
    <div class="view">
        <input class="toggle" type="checkbox" ${todo.completado ? 'checked' : ''} >
        <label>${ todo.tarea }</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
    </li>`

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    
    // para colocar todo lo del div pero el primer hijo, seria li
    ulTodoList.append( div.firstElementChild );
    
    return div.firstElementChild;
    
}

//eventos

txtInput.addEventListener('keyup', (event) =>{

    if (event.keyCode === 13 && txtInput.value.length > 0){
        console.log( txtInput.value );
        const nuevoTodo = new Todo( txtInput.value );
        todoList.nuevoTodo( nuevoTodo )

        crearTodoHtml ( nuevoTodo );
        txtInput.value = '';
    }
});

ulTodoList.addEventListener('click', (event) =>{
//saber que elemento de html estoy haciendo click
    const nombreElemento = event.target.localName; //input, label, button
// borrar li en html
    const todoElemento = event.target.parentElement.parentElement;
// identificar id borrado del elemento
    const todoId = todoElemento.getAttribute('data-id')


    if ( nombreElemento.includes('input') ){ //click en el check
        todoList.marcarCompletado( todoId );
        /* agregar o cambiar clase en html */
        todoElemento.classList.toggle('completed')

    } else if (nombreElemento.includes('button')){ //se borra el todo
        
        todoList.eliminarTodo( todoId );//borrado del source
        ulTodoList.removeChild( todoElemento ) 
    }

})

btnBorrar.addEventListener('click', () => {

    todoList.eliminarCompletados();

    //empezar del utlimo al primero, ignorar la clase todo y usar html
    for( let i = ulTodoList.children.length-1; i >= 0 ; i-- ){
        // children contiene todos los hijos de esa class

        const elemento = ulTodoList.children[i];

       if ( elemento.classList.contains('completed') ) {
           ulTodoList.removeChild(elemento);
           
       }
    }


});

ulfiltros.addEventListener('click', (event) =>{

    const filtro = event.target.text;
    if (!filtro) { //si nb existe
        return;
    }

    anchorFiltros.forEach(elem => elem.classList.remove('selected'))
    event.target.classList.add('selected');

    //usar el atributo hidden de css para ocutar cuando se presione ese boton
    for (const elemento of ulTodoList.children) {

        elemento.classList.remove('hidden');//clase Todos por default
        const completado = elemento.classList.contains('completed')

        switch (filtro) {
            case 'Pendientes':
                if (completado) {

                    elemento.classList.add('hidden')
                    
                }
                break;

            case 'Completados':
                if ( !completado ) {

                    elemento.classList.add('hidden')
                
                }
                break;
        }
    }
})