// import { current } from '@reduxjs/toolkit';
import axios from 'axios';
import React, { Component } from 'react';
import BoxComponent from '../box/box';
import EmployeeList from '../employeeList/employeeList';
import styles from './home.module.css';

export default class HomeComponent extends Component {


    /**
     * Global State, boxSize : 2D Array, for drawing UI
     * isPlayer1 : checks whose chance is it
     * employeeList : List fetched from API
     * fiteredEmployeeList: List filtered from employee list and pushed on box click
     * SequenceOfCLicks: Queue for keeping track of moves
     * @memberof HomeComponent
     */
    state = {
        boxSize: [],
        isPlayer1: true,
        employeeList: [],
        filteredEmployeeList: [],
        sequenceOfClicks: []
    }

    componentDidMount() {
        this.setState({
            boxSize: this.make2DArray(3)
        })

        this.getEmployeeList();
    }


    /**
     *
     * @param {*} size
     * @returns
     * @memberof HomeComponent
     * Makes 2D Array to be set for BoardSize
     */
    make2DArray(size) {
        let array = new Array(size);
        for (let i = 0; i < size; i++) {
            array[i] = new Array(size);
        }
        array = this.addValue2Darray(array);
        return array;
    }


    /**
     *
     * @param {*} array
     * @returns
     * @memberof HomeComponent
     * Adds index value to the array indexes
     */
    addValue2Darray(array) {
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array[i].length; j++) {
                array[i][j] = `${i}${j}`;
            }
        }
        return array;
    }


    /**
     *
     * @param {*} isPlayer1
     * @param {*} index
     * @param {*} yIndex
     * @memberof HomeComponent
     * Called when player clicks on boxes
     */
    updateBox(isPlayer1, xIndex, yIndex) {
        let array = this.state.boxSize;

        // If block to check if x index can be clicked or not
        if (xIndex === 2 || array[xIndex + 1][yIndex].clickedByPlayer1 !== undefined) {
            if (array[xIndex][yIndex].clickedByPlayer1 === undefined && this.state.employeeList.length > 0) {
                array[xIndex][yIndex] = { clickedByPlayer1: isPlayer1, x: xIndex, y: yIndex }
                let sequenceOfClicks = this.state.sequenceOfClicks;
                sequenceOfClicks.push(array[xIndex][yIndex]);
                this.setState({
                    boxSize: array,
                    isPlayer1: !isPlayer1,
                    sequenceOfClicks: sequenceOfClicks
                });

                this.modifyFilteredEmployeeList();
                let isArrayFull = this.state.sequenceOfClicks.length === 9 ? true : false
                if (isArrayFull) {
                    this.resetGame();
                }
            }
        }
    }



    /**
     *
     * @memberof HomeComponent
     * Fetches employee list from backend
     */
    getEmployeeList() {
        axios.get('http://dummy.restapiexample.com/api/v1/employees').then((response) => {
            this.setState({
                employeeList: response.data.data
            })
        }).catch(() => {
            alert('Error from API, Please refresh')
            this.setState({
                employeeList: []
            })
        })
    }



    /**
     *
     * @memberof HomeComponent
     * Pushes random picked value from employeelist
     */
    modifyFilteredEmployeeList() {
        let employeeList = this.state.employeeList;
        let randomIndex = Math.floor(Math.random() * employeeList.length - 1) + 1;
        let filteredEmployeeList = this.state.filteredEmployeeList;
        filteredEmployeeList.push(employeeList[randomIndex]);
        this.setState({
            filteredEmployeeList: filteredEmployeeList
        })
    }


    /**
     *
     * @memberof HomeComponent
     * Resets game when grid is full
     */
    resetGame() {
        this.setState({
            boxSize: this.make2DArray(3),
            isPlayer1: true,
            filteredEmployeeList: [],
            sequenceOfClicks: []
        })
        alert('Game over');
    }



    /**
     *
     * @memberof HomeComponent
     * undo the last move
     */
    undoLastMove = () => {
        let filteredEmployeeList = this.state.filteredEmployeeList;
        let sequenceOfClicks = this.state.sequenceOfClicks;
        let previousMove = sequenceOfClicks.pop();
        let boxSize = this.state.boxSize;
        filteredEmployeeList.pop();
        boxSize[previousMove.x][previousMove.y] = previousMove.x + previousMove.y;
        this.setState({
            filteredEmployeeList: filteredEmployeeList,
            boxSize: boxSize,
            sequenceOfClicks: sequenceOfClicks
        })
    }

    render() {
        return (
            <div className={styles.fullWidth}>
                <h1>{this.state.isPlayer1 ? `Player 1` : `Player 2`}  Your Chance</h1>
                <div className={styles.root}>
                    <div className={styles.subRoot}>
                        {
                            this.state.boxSize.map((item, xIndex) => {
                                return (
                                    <div key={xIndex} className={styles.container}>
                                        {
                                            item.map((cell, yIndex) => {
                                                return (
                                                    <div className={(xIndex === 2 || this.state.boxSize[xIndex + 1][yIndex].clickedByPlayer1 !== undefined) ? styles.boxSelection : styles.boxSelectionInactive} key={yIndex} onClick={() => this.updateBox(this.state.isPlayer1, xIndex, yIndex)}>
                                                        <BoxComponent data={this.state.boxSize[xIndex][yIndex]} />
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
                        <div className={styles.undoContainer}>
                            <h1>Employee List</h1>
                            <button disabled={this.state.filteredEmployeeList.length === 0} onClick={this.undoLastMove} >Undo Last Move</button>
                        </div>
                        <EmployeeList data={this.state.filteredEmployeeList} />
                    </div>
                </div>
            </div>
        )
    }
}
