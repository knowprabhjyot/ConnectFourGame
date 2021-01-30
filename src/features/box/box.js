import React from 'react';
import styles from './box.module.css';

const BoxComponent = (props) => {
    return (
        <div className={styles.box}>
            { props.data.clickedByPlayer1 === true ? <img alt="player1" src="http://giphygifs.s3.amazonaws.com/media/jQS9YkJXofyeI/giphy.gif" /> : null}
            { props.data.clickedByPlayer1 === false ? <img alt="player2" src="https://media.giphy.com/media/5kFbMBOEdWjg1nItoG/giphy.gif" /> : null}
        </div>
    )
}

export default BoxComponent;