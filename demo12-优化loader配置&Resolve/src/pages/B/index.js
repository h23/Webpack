import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './b.scss';
import img from 'assets/images/1.png';

class B extends Component {
    render() {
        return (
            <div>
                <h1>Hello word! I'm B.</h1>
                <img src={img} alt=""/>
            </div>
        );
    }
}
ReactDOM.render(<B />, document.getElementById('app'));