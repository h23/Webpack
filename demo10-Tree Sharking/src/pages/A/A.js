import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './a.css';
import { funcA, funcB } from '../../util';

class A extends Component {

    render() {
        $("body").css("background-color","gray");
        return <h1><i></i>Hello word! I'm A. {funcA()}</h1>
    }
}
ReactDOM.render(<A />, document.getElementById('app'));