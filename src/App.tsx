import React, { useEffect, useState } from 'react'
import './App.css'
import InputField from './components/inputField.tsx/inputField'
import Todo from './Models/todo.model';
import TodoList from './components/todoList/TodoList';

const config = {
  title : "Taskade",
  todosLocalStorageKey : 'todos',
  finishedTodosLocalStorageKey : 'finishedTodos',
}

// app is of type react functional component
const App: React.FC = () => {
  //retrive the stored todos if present
  const [todos, setTodos] = useState<Todo[]>(() => initializeTodo(config.todosLocalStorageKey));
  const [finishedTodos, setFinishedTodos] = useState<Todo[]>(()=> initializeTodo(config.finishedTodosLocalStorageKey))


  /**
 * Initializes the todo list from local storage.
 * Retrieves the stored todos from local storage, parses them as JSON,
 * and returns the todo list array. If no todos are stored, returns an empty array.
 *
 * @returns An array of Todo interface items parsed from local storage, or an empty array if no todos are stored.
 */
  function initializeTodo(localStorageKey : string): Todo[] {
    const storedTodos = localStorage.getItem(localStorageKey);
    return storedTodos ? JSON.parse(storedTodos) : [];
  }

  const createTodo = (newTodo: string) => {
    const todoObj : Todo = {
      id : Date.now(),
      todo : newTodo,
      isFinished : false,
    }

    setTodos(prev => [...prev , todoObj]);    
  }

  useEffect(() => {
    document.title = config.title;
  }, []);

  useEffect(() => {
    localStorage.setItem(config.todosLocalStorageKey , JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem(config.finishedTodosLocalStorageKey , JSON.stringify(finishedTodos));
  }, [finishedTodos]);

  return (
    <div className="app">
      <span className="heading">Taskade</span>
      <InputField createTodo={createTodo} />
      <TodoList todoList={todos} setTodos={setTodos} finishedTodos={finishedTodos} setFinishedTodos={setFinishedTodos}/>
    </div>
  )
}

export default App
