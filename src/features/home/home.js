import { current } from '@reduxjs/toolkit';
import axios from 'axios';
import React, { Component } from 'react';
import BoxComponent from '../box/box';
import EmployeeList from '../employeeList/employeeList';
import styles from './home.module.css';

export default class HomeComponent extends Component {

    state = {
        boxSize: [],
        isPlayer1: true,
        employeeList: [],
        filteredEmployeeList: [],
        totalClicks: 0
    }

    componentDidMount() {
        this.setState({
            boxSize: this.make2DArray(3)
        })

        this.getEmployeeList();
    }

    make2DArray(size) {
        let array = new Array(size);
        for (let i = 0; i < size; i++) {
            array[i] = new Array(size);
        }
        array = this.addValue2Darray(array);
        return array;
    }

    addValue2Darray(array) {
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array[i].length; j++) {
                array[i][j] = `${i}${j}`;
            }
        }
        return array;
    }

    updateBox(isPlayer1, index, valIndex) {
        let array = this.state.boxSize;
        if (array[index][valIndex].clickedByPlayer1 === undefined && this.state.employeeList.length > 0) {
            array[index][valIndex] = { clickedByPlayer1: isPlayer1 }
            this.setState({
                boxSize: array,
                isPlayer1: !isPlayer1,
                totalClicks: this.state.totalClicks + 1
            });

            this.modifyFilteredEmployeeList();
            let isArrayFull = this.state.totalClicks === 8 ? true : false
            console.log(isArrayFull, 'array value');
            if (isArrayFull) {
                this.resetGame();
            }
        }
    }

    getEmployeeList() {
        axios.get('http://dummy.restapiexample.com/api/v1/employees').then((response) => {
            this.setState({
                employeeList: response.data.data
            })
        }).catch((error) => {
            alert('Error from API')
            this.setState({
                employeeList: []
            })
        })
    }

    modifyFilteredEmployeeList() {
        let employeeList = this.state.employeeList;
        let randomIndex = Math.floor(Math.random() * employeeList.length - 1)  + 1;
        console.log(randomIndex, 'random');
        let filteredEmployeeList = this.state.filteredEmployeeList;
        filteredEmployeeList.push(employeeList[randomIndex]);
        this.setState({
            filteredEmployeeList: filteredEmployeeList
        })

    }

    resetGame() {
        alert('Game over');
        this.setState({
            boxSize: this.make2DArray(3),
            isPlayer1: true,
            totalClicks: 0
        })
    }

    render() {
        return (
            <div className={styles.fullWidth}>
                <h1>{this.state.isPlayer1 ? `Player 1` : `Player 2`}  Your Chance</h1>
                <div className={styles.root}>
                <div className={styles.subRoot}>
                {
                    this.state.boxSize.map((item, index) => {
                        return (
                            <div key={index} className={styles.container}>
                                {
                                    item.map((cell, valIndex) => {
                                        return (
                                            <div className={styles.boxSelection} key={valIndex} onClick={() => this.updateBox(this.state.isPlayer1, index, valIndex)}>
                                                <BoxComponent data={this.state.boxSize[index][valIndex]} />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
                </div>
                <div>
                    <EmployeeList data={this.state.filteredEmployeeList} />
                </div>
                </div>
            </div>
        )
    }
}
