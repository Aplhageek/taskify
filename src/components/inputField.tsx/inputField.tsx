import styles from './inputField.module.css';
import React, { useState } from 'react'

// Interface prop
interface InputFieldProps {
    createTodo: (newTodo: string) => void;
}


const InputField: React.FC<InputFieldProps> = ({ createTodo }) => {

    const [inputVal, setInputValue] = useState<string>("");

    // TODO: prevent default behaviour of reloading after submit btn clicked
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        

        if (inputVal.trim().length < 1) {
            alert("Please Enter the Todo First!");
            return;
        }

        createTodo(inputVal);
        setInputValue("");
    }


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }


    return (
        <form className={styles.inputForm} onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder='Enter a Task'
                className={styles.input}
                onChange={handleInputChange}
                value={inputVal}
            />
            <button
                type="submit"
                className={styles.btn}
                disabled={!inputVal.trim()}
            >
                GO
            </button>
        </form>
    )
}

export default InputField;