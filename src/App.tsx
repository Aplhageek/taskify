import React, { useEffect, useState } from 'react'
import './App.css'
import InputField from './components/inputField.tsx/inputField'

// app is of type react functional component
const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");

  const createTodo = (newTodo: string) => {
    setTodo(newTodo);
  }

  console.log(todo);

  useEffect(() => {
    document.title = "Taskade"
  }, []);

  return (
    <div className="app">
      <span className="heading">Taskade</span>
      <InputField createTodo={createTodo} />
    </div>
  )
}

export default App
