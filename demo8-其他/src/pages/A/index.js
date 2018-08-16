import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './a.css';

class A extends Component {
    render() {
        return <h1><i className="icon-circle" />Hello word! I'm A.</h1>
    }
}
ReactDOM.render(<A />, document.getElementById('app'));