import { appState, textbookState } from '../../store';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import React from 'react';
import { CardContainer } from './components/card-container';

export const TextbookPage: React.FC = observer(() => {
  return (
    <div>
      <div onClick={() => appState.setPage()}>
        <Link to="/">Main</Link>
      </div>
      <h1>Textbook Page</h1>
      <CardContainer wordsCollection={toJS(textbookState.currentWords)} />
      <div id="group-num">Group: {textbookState.wordGroup + 1}</div>
      <div id="page-num">Page: {textbookState.wordPage + 1}</div>
      
      <div>
        <button onClick={() => textbookState.setPrevWordPage()}>prev</button>
        <button onClick={() => textbookState.setNextWordPage()}>next</button>
      </div>

      <div>
        <button onClick={() => textbookState.setWordGroup(0)}>1</button>
        <button onClick={() => textbookState.setWordGroup(1)}>2</button>
        <button onClick={() => textbookState.setWordGroup(2)}>3</button>
        <button onClick={() => textbookState.setWordGroup(3)}>4</button>
        <button onClick={() => textbookState.setWordGroup(4)}>5</button>
        <button onClick={() => textbookState.setWordGroup(5)}>6</button>
      </div>
    </div>
  );
});


