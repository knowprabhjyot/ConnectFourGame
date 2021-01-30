import React from 'react';
import Employee from '../employee/employee';
import styles from './employeeList.module.css';

const EmployeeList = (props) => {
    console.log(props);
    return (
        <div>
            <h1>Employee List</h1>
            <div className={styles.container}>
                { props.data.map((item, index) => {
                    return <Employee key={index} data={item} />
                })}
            </div>
        </div>
    )
}

export default EmployeeList;