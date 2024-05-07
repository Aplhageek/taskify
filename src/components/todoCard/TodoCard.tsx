import { LiaEdit } from 'react-icons/lia';
import styles from './todoCard.module.css';
import React from 'react'
import { AiOutlineDelete } from 'react-icons/ai';
import { CiSquareCheck } from 'react-icons/ci';

interface Prop {
    todo: string;
}

const TodoCard: React.FC<Prop> = ({ todo }) => {
    return (
        <form className={styles.card}>
            <span className={styles.todoText}>{todo}</span>
            <div className={styles.actionbtn}>
                <LiaEdit />
                <AiOutlineDelete />
                <CiSquareCheck />
            </div>
        </form>
    )
}

export default TodoCard;