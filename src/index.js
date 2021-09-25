import './styles.css';

import {Todo, TodoList} from './class'
import { crearTodoHtml } from './js/componentes';


export const todoList = new TodoList();

console.log(todoList.todos);

//mostrarlos en html pero mantenerlos en localstorage
todoList.todos.forEach(todo => crearTodoHtml( todo ));
//al momento de almacenar en localstorage los metodos se pierden

// const newTodo = new Todo('aprender javascript');
// todoList.nuevoTodo(newTodo);

console.log('todos', todoList.todos);



