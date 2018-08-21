import React, { Component } from 'react';
import ReactDOM from 'react-dom';
require('./a.css');
import { funcA } from '../../util';

class A extends Component {
    render() {
        $("body").css("background-color","gray")
        return <h1>Hello word! I'm A. {funcA()}</h1>
    }
}
ReactDOM.render(<A />, document.getElementById('app'));