import styles from './inputField.module.css';
import React from 'react'

const InputField: React.FC = () => {
    // TODO: prevent default behaviour of reloading after submit btn clicked

    return (
        <form className={styles.inputForm}>
            <input type="text" placeholder='Enter a Task' className={styles.input} />
            <button type="submit" className={styles.btn}>GO</button>
        </form>
    )
}

export default InputField;