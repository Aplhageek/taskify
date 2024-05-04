import React, { useEffect, useState } from 'react'
import './App.css'
import InputField from './components/inputField.tsx/inputField'
import Todo from './Models/todo.model';

// app is of type react functional component
const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([])

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

  return (
    <div className="app">
      <span className="heading">Taskade</span>
      <InputField createTodo={createTodo} />

      {
        todos.map(todo => <li>{todo.todo}</li>)
      }
    </div>
  )
}

export default App
