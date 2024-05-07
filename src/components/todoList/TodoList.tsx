import React from "react";
import Todo from "../../Models/todo.model";
import styles from './todoList.module.css';
import TodoCard from "../todoCard/TodoCard";

interface Prop {
  todoList: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList: React.FC<Prop> = ({ todoList, setTodos }) => {
  return (
    <section className={styles.todoList}>
      {
        todoList.map((todo) => <TodoCard todo={todo} key={todo.id} setTodos={setTodos} />)
      }
    </section>
  )
}

export default TodoList;