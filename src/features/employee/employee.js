import React from 'react';
import styles from './employee.module.css';

const Employee = (props) => {
    return (
        <div className={styles.employee}>
            {props.data.employee_name}, ${props.data.employee_salary}
        </div>
    )
}

export default Employee;