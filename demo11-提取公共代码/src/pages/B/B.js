import React, { Component } from 'react';
import ReactDOM from 'react-dom';
require('./b.scss');
import { funcB } from '../../util';

class B extends Component {
    render() {
        return (
            <div>
                <h1>Hello word! I'm B.</h1>
                { funcB() }
                <img src={require('../../assets/images/icon.jpg')} alt=""/>
            </div>
        );
    }
}
ReactDOM.render(<B />, document.getElementById('app'));