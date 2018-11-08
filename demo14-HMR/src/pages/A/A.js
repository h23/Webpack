import React, { Component } from 'react';
import { AppContainer } from 'react-hot-loader';
import ReactDOM from 'react-dom';
require('./a.css');
import Test from './Test';


function render(RootElement) {
  ReactDOM.render(
    <AppContainer>
      <RootElement />
    </AppContainer>,
    document.getElementById('app')
  );
}

render(Test);

if (module.hot) {
  module.hot.accept('./Test', () => {
    render(Test);
  });
}