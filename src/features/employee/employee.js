import React from 'react';
import styles from './employee.module.css';

const Employee = (props) => {
    return (
        <div className={styles.employee}>
            <h4>{props.data.employee_name}, {new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(props.data.employee_salary)}</h4>
        </div>
    )
}

export default Employee;