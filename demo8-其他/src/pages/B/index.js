import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './b.scss';

class B extends Component {
    render() {
        return (
            <div>
                <h1>Hello word! I'm B.</h1>
                <img src={require('../../assets/images/1.png')} alt=""/>
            </div>
        );
    }
}
ReactDOM.render(<B />, document.getElementById('app'));