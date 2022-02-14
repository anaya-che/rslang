import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { userWordsStore } from './store';
import { userState } from './store/user-state';

userState.checkAuth();
userWordsStore.getUserWords();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
