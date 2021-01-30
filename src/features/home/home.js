import React, { Component } from 'react';
import BoxComponent from '../box/box';
import styles from './home.module.css';

export default class HomeComponent extends Component {

    state = {
        boxSize: []
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

    render() {
        return (
            this.state.boxSize.map((item, index) => {
                return (
                    <div key={index} className={styles.container}>
                        {
                            item.map((val, valIndex) => {
                                return (
                                    <BoxComponent data={val} key={valIndex} />
                                )
                            })
                        }
                    </div>
                )
            }
            ))
    }
}
