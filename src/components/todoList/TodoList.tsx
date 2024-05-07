import React from "react";
import Todo from "../../Models/todo.model";
import styles from './todoList.module.css';
import TodoCard from "../todoCard/TodoCard";

interface Prop {
    todoList: Todo[];
}

const TodoList: React.FC<Prop> = ({todoList}) => {
  return (
    <section className={styles.todoList}>
        {
            todoList.map((todo) => <TodoCard todo={todo.todo} key={todo.id}/> )
        }
    </section>
  )
}

export default TodoList;