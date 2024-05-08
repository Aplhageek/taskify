import React from "react";
import Todo from "../../Models/todo.model";
import styles from './todoList.module.css';
import TodoCard from "../todoCard/TodoCard";

interface Prop {
  todoList: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  finishedTodos : Todo[];
  setFinishedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList: React.FC<Prop> = ({ todoList, setTodos, finishedTodos, setFinishedTodos }) => {

  return (
    <main className={styles.wrapper}>
      <section className={`${styles.todoList} ${styles.todoListActive}`} >
        <h3 className={styles.heading}>Active Tasks</h3>
        {
          todoList.map((todo) => <TodoCard todo={todo} key={todo.id} setTodos={setTodos}  setFinishedTodos={setFinishedTodos}/>)
        }
      </section>
      <section className={`${styles.todoList} ${styles.todoListCompleted}`}>
        <h3 className={styles.heading}>Finished Tasks</h3>
        {
          finishedTodos.map((todo) => <TodoCard todo={todo} key={todo.id} setTodos={setTodos}  setFinishedTodos={setFinishedTodos}/>)
        }
      </section>
    </main>
  )
}

export default TodoList; 