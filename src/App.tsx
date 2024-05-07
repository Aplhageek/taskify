import React, { useEffect, useState } from 'react'
import './App.css'
import InputField from './components/inputField.tsx/inputField'
import Todo from './Models/todo.model';
import TodoList from './components/todoList/TodoList';

// app is of type react functional component
const App: React.FC = () => {
  //retrive the stored todos if present
  const [todos, setTodos] = useState<Todo[]>(initializeTodo);


  /**
 * Initializes the todo list from local storage.
 * Retrieves the stored todos from local storage, parses them as JSON,
 * and returns the todo list array. If no todos are stored, returns an empty array.
 *
 * @returns An array of Todo interface items parsed from local storage, or an empty array if no todos are stored.
 */
  function initializeTodo(): Todo[] {
    const storedTodos = localStorage.getItem('todos');
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

  console.log(todos);


  useEffect(() => {
    document.title = "Taskade"
  }, []);

  useEffect(() => {
    localStorage.setItem("todos" , JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="app">
      <span className="heading">Taskade</span>
      <InputField createTodo={createTodo} />
      <TodoList todoList={todos} setTodos={setTodos} />
    </div>
  )
}

export default App
