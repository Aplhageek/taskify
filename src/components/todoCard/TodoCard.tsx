import { LiaEdit } from 'react-icons/lia';
import styles from './todoCard.module.css';
import React, { useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai';
import Todo from '../../Models/todo.model';
import { MdSettingsBackupRestore } from 'react-icons/md';
import { IoCheckboxOutline } from 'react-icons/io5';
import { CiSaveUp2 } from 'react-icons/ci';

interface Prop {
    todo: Todo;
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoCard: React.FC<Prop> = ({ todo, setTodos }) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [editedText, setEditedText] = useState<string>(todo.todo);


    const handleCheck = (id: number) => {
        setTodos(prevTodos => {
            return prevTodos.map(todo => {
                if (todo.id === id) {
                    return { ...todo, isFinished: true }
                }
                return todo;
            })
        })
    }

    const handleRestore = (id: number) => {
        setTodos(prevTodos => {
            return prevTodos.map(todo => {
                if (todo.id === id) {
                    return { ...todo, isFinished: false }
                }
                return todo;
            })
        });
    }

    const handleDelete = (id: number) => {
        setTodos(prevTodos => {
            return prevTodos.filter(todo => todo.id !== id);
        });
    }

    const handleEdit = () => {
        if (!isEditMode && !todo.isFinished) {
            setIsEditMode(!isEditMode);
        }
    };

    const handleSave = (id : number) => {
        // 
        setIsEditMode(!isEditMode);
        setTodos(prevTodos => prevTodos.map(todo => todo.id === id ? {...todo, todo : editedText} : todo ));
    }

    const handleSubmit = (event : React.FormEvent<HTMLFormElement>, id : number) => {
        event.preventDefault();
        handleSave(id);
    }

    const handleInputChange = (event :  React.ChangeEvent<HTMLInputElement>) => {
        setEditedText(event.target.value);
    }

    return (
        <form className={styles.card} onSubmit={(event) => handleSubmit(event, todo.id)}>
            {
                isEditMode ?
                    (<input type='text' className={styles.editInput} value={editedText} onChange={handleInputChange} />) :
                    (
                        todo.isFinished ?
                            (<s className={styles.todoText}>{todo.todo}</s>) :
                            (<span className={styles.todoText}>{todo.todo}</span>)
                    )
            }

            <div className={styles.actionbtn}>
                {
                    isEditMode ? 
                    (<CiSaveUp2 onClick={() => handleSave(todo.id)} />):
                    (<LiaEdit onClick={handleEdit} />)

                }

                <AiOutlineDelete onClick={() => handleDelete(todo.id)} />

                {
                    !todo.isFinished ?
                        (<IoCheckboxOutline onClick={() => handleCheck(todo.id)} />) :
                        (<MdSettingsBackupRestore onClick={() => handleRestore(todo.id)} />)
                }

            </div>
        </form>
    )
}

export default TodoCard;