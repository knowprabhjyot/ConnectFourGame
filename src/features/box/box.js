import React from 'react';
import styles from './box.module.css';

const BoxComponent = (props) => {
    return (
        <div onClick={() => console.log(props.data)} className={styles.box}>

        </div>
    )
}

export default BoxComponent;