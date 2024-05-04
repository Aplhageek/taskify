import React, { useEffect } from 'react'
import './App.css'
import InputField from './components/inputField.tsx/inputField'

// app is of type react functional component
const App : React.FC = () => {

  useEffect (() => {
    document.title = "Taskade"
  }, []);

  return (
    <div className="app">
      <span className="heading">Taskade</span> 
      <InputField />
    </div>
  )
}

export default App
