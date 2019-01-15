import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import './index.css';

import App from './App';
import reducers from './reducers/index';

const store = createStore(reducers, {}, applyMiddleware(reduxPromise));
//const store = createStore(() => [], {}, applyMiddleware());

ReactDOM.render(
  <Provider store={store}><App/></Provider>, 
  document.querySelector('#root')
);
