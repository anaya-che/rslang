import { appState, textbookState } from '../../store';
import { audiocallState } from "../../store/audiocall-state";
import { Link, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import { useEffect } from 'react';
import { CardContainer } from './components/card-container';
import { getNextPage, getPrevPage } from '../../utils/textbook-handlers/navigation';
import { ILinkProps } from '../../utils/interfaces';

export const TextbookPage = observer(() => {
  let linkProps: ILinkProps = useParams();
  let { group, page } = linkProps;
  textbookState.setPage(group, page);

  useEffect(() => {
    textbookState.getCurrentWords();
  }, [group, page]);

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
        <Link to={`/textbook/${textbookState.wordGroup + 1}/${getPrevPage()}`}>
          <button>prev</button>
        </Link>
        <Link to={`/textbook/${textbookState.wordGroup + 1}/${getNextPage()}`}>
          <button>next</button>
        </Link>
        <Link to="/games/audiocall">
          <button onClick={audiocallState.handleAudiocallStart}>Audiocall</button>
        </Link>
        <Link to="/games/sprint">
          <button>Sprint</button>
        </Link>
      </div>

      <div>
        <Link to="/textbook/1/1">
          <button>1</button>
        </Link>
        <Link to="/textbook/2/1">
          <button>2</button>
        </Link>
        <Link to="/textbook/3/1">
          <button>3</button>
        </Link>
        <Link to="/textbook/4/1">
          <button>4</button>
        </Link>
        <Link to="/textbook/5/1">
          <button>5</button>
        </Link>
        <Link to="/textbook/6/1">
          <button>6</button>
        </Link>
      </div>
    </div>
  );
});
