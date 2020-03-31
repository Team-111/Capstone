import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App.js';
import { Provider } from 'react-redux';
import store from './store';

const RNRedux = () => (
  <Provider store = { store }>
    <App />
  </Provider>
)

AppRegistry.registerComponent('APP_NAME_HERE', () => RNRedux);

// The below line is necessary for use with the TestBed App
AppRegistry.registerComponent('ViroSample', () => RNRedux);
