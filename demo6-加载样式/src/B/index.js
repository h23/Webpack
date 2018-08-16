import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './b.scss';

class B extends Component {
    render() {
        return <h1>Hello word! I'm B.</h1>
    }
}
ReactDOM.render(<B />, document.getElementById('app'));