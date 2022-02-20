import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { userState } from './store';
import './index.scss';

userState.checkAuth();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
