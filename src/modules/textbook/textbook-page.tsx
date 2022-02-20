import { textbookState } from '../../store';
import {  useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import { useEffect } from 'react';
import { CardContainer } from './components/card-container';
import { ILinkProps } from '../../utils/interfaces';
import style from './textbook.module.scss';
import { Navigation } from './components/navigation';

export const TextbookPage = observer(() => {
  let linkProps: ILinkProps = useParams();
  let { group, page } = linkProps;
  textbookState.setPage(group, page);

  useEffect(() => {
    textbookState.getCurrentWords();
  }, [group, page]);

  return (
    <div>
      <Navigation group={group} page={page} />
      <h1>Учебник</h1>
      <div id="group-num">
        Группа:{' '}
        {textbookState.wordGroup !== 6
          ? textbookState.wordGroup + 1
          : 'сложные слова'}
      </div>
      <div id="page-num">Страница: {textbookState.wordPage + 1}</div>
      {textbookState.wordGroup !== 6 && (
        <CardContainer wordsCollection={toJS(textbookState.currentWords)} />
      )}

      {textbookState.wordGroup === 6 && (
        <CardContainer wordsCollection={toJS(textbookState.difficultWords)} />
      )}
    </div>
  );
});
