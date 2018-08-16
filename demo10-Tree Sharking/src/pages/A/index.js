import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './a.css';
import {funcA} from '../../util';

class A extends Component {
    render() {
        return (
            <div>
                <h1>Hello word! I'm A.</h1>
                <h1>{funcA()}</h1>
            </div>
        );
    }
}
ReactDOM.render(<A />, document.getElementById('app'));