import { appState, textbookState, userState } from '../../store';
import { audiocallState } from "../../store/audiocall-state";
import { Link, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import { useEffect } from 'react';
import { CardContainer } from './components/card-container';
import {
  getNextPage,
  getPrevPage,
} from '../../utils/textbook-helpers/navigation';
import { ILinkProps } from '../../utils/interfaces';
import { sprintState } from '../../store/sprint-state';

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
        <Link to="/">Главная страница</Link>
      </div>
      <h1>Учебник</h1>
      {textbookState.wordGroup !== 6 && (
        <CardContainer wordsCollection={toJS(textbookState.currentWords)} />
      )}

      {textbookState.wordGroup === 6 && (
        <CardContainer wordsCollection={toJS(textbookState.difficultWords)} />
      )}

      <div id="group-num">Группа: {textbookState.wordGroup + 1}</div>
      <div id="page-num">Страница: {textbookState.wordPage + 1}</div>

      <div>
        <Link to={`/textbook/${textbookState.wordGroup + 1}/${getPrevPage()}`}>
          <button>prev</button>
        </Link>
        <Link to={`/textbook/${textbookState.wordGroup + 1}/${getNextPage()}`}>
          <button>next</button>
        </Link>
        <Link to="/games/audiocall">
          <button onClick={audiocallState.handleAudiocallStart}>
            Аудиовызов
          </button>
        </Link>
        <Link to="/games/sprint">
          <button onClick={() => {
            sprintState.startFromTextbook(+group-1, +page-1)            
            }}>
            Спринт
          </button>
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
        {userState.isAuthorized && (
          <Link to="/textbook/7/1">
            <button>Сложные слова</button>
          </Link>
        )}
      </div>
    </div>
  );
});
