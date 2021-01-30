import { current } from '@reduxjs/toolkit';
import React, { Component } from 'react';
import BoxComponent from '../box/box';
import styles from './home.module.css';

export default class HomeComponent extends Component {

    state = {
        boxSize: [],
        isPlayer1: true
    }

    componentDidMount() {
        this.setState({
            boxSize: this.make2DArray(3)
        })
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
        if (array[index][valIndex].clickedByPlayer1 === undefined) {
            array[index][valIndex] = { clickedByPlayer1: isPlayer1 }
            this.setState({
                boxSize: array,
                isPlayer1: !isPlayer1
            });
            let isArrayFull = false;
            array.forEach((item) => {
                isArrayFull = item.every((val) => typeof val === 'object')
            })

            if (isArrayFull) {
                this.resetGame();
            }
        }
    }

    resetGame() {
        alert('Game over');
        this.setState({
            boxSize: this.make2DArray(3),
            isPlayer1: true
        })
    }

    render() {
        return (
            <div className={styles.root}>
                <h1>{this.state.isPlayer1 ? `Player 1` : `Player 2`}  Your Chance</h1>
                {
                    this.state.boxSize.map((item, index) => {
                        return (
                            <div key={index} className={styles.container}>
                                {
                                    item.map((cell, valIndex) => {
                                        return (
                                            <div key={valIndex} onClick={() => this.updateBox(this.state.isPlayer1, index, valIndex)}>
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
        )
    }
}
