import { LiaEdit } from 'react-icons/lia';
import styles from './todoCard.module.css';
import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai';
import Todo from '../../Models/todo.model';
import { MdSettingsBackupRestore } from 'react-icons/md';
import { IoCheckboxOutline } from 'react-icons/io5';
import { CiSaveUp2 } from 'react-icons/ci';

interface Prop {
    todo: Todo;
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    setFinishedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}


const TodoCard: React.FC<Prop> = ({ todo, setTodos, setFinishedTodos }) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [editedText, setEditedText] = useState<string>(todo.todo);

    const inputRef = useRef<HTMLInputElement>(null);

    const handleMove = async (id: number, setMoveFrom: React.Dispatch<React.SetStateAction<Todo[]>>, setMoveTo: React.Dispatch<React.SetStateAction<Todo[]>>) => {
        let TodoObj: Todo | null = null;

        await setMoveFrom(prevTodos => prevTodos.filter(todo => {
            if (todo.id === id) {
                TodoObj = todo;
                return false;
            }
            return true;
        }));

        if (TodoObj !== null) {
            const todo = TodoObj as Todo;
            todo.isFinished = !todo.isFinished;
            await setMoveTo(prev => [...prev, todo]);
        }
    }

    const handleDelete = (id: number, setStateUpdater : React.Dispatch<React.SetStateAction<Todo[]>>) => {
        setStateUpdater(prevTodos => {
            return prevTodos.filter(todo => todo.id !== id);
        });
    }

    const handleEdit = () => {
        if (!isEditMode && !todo.isFinished) {
            setIsEditMode(!isEditMode);
        }
    };

    const handleSave = (id: number, editedTextP: string) => {
        if (editedTextP.trim().length <= 0) {
            return;
        }
        // 
        setIsEditMode(!isEditMode);
        setTodos(prevTodos => prevTodos.map(todo => todo.id === id ? { ...todo, todo: editedTextP } : todo));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>, id: number, editedTextP: string) => {
        event.preventDefault();
        handleSave(id, editedTextP);
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditedText(event.target.value);
    }


    useEffect(() => {
        if (isEditMode) {
            inputRef.current?.focus();
        }
    }, [isEditMode]);

    return (
        <form className={`${styles.card} ${todo.isFinished ? styles.finished : ""}`} onSubmit={(event) => handleSubmit(event, todo.id, editedText)}>
            {
                isEditMode ?
                    (<input type='text' className={styles.editInput} value={editedText} onChange={handleInputChange} ref={inputRef} />) :
                    (
                        todo.isFinished ?
                            (<s className={styles.todoText}>{todo.todo}</s>) :
                            (<span className={styles.todoText}>{todo.todo}</span>)
                    )
            }

            <div className={styles.actionbtn}>
                {
                    isEditMode ?
                        (<CiSaveUp2 onClick={() => handleSave(todo.id, editedText)} />) :
                        (<LiaEdit onClick={handleEdit} />)

                }

                {
                    !todo.isFinished ?
                        (<AiOutlineDelete onClick={() => handleDelete(todo.id , setTodos)} />) :
                        (<AiOutlineDelete onClick={() => handleDelete(todo.id , setFinishedTodos)} />)
                }

                {
                    !todo.isFinished ?
                        // (<IoCheckboxOutline onClick={() => handleCheck(todo.id)} />) :
                        (<IoCheckboxOutline onClick={() => handleMove(todo.id, setTodos, setFinishedTodos)} />) :
                        (<MdSettingsBackupRestore onClick={() => handleMove(todo.id, setFinishedTodos, setTodos)} />)
                }

            </div>
        </form>
    )
}

export default TodoCard;