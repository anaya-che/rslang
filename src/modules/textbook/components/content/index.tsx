import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { textbookState } from '../../../../store';
import { ILinkProps } from '../../../../utils/interfaces';
import { CardContainer } from '../card-container';
import { Navigation } from '../navigation';
import style from './content.module.scss';

export const Content: React.FC = observer(() => {
  const cardStyle = `cardGroup${textbookState.wordGroup}`;
  let linkProps: ILinkProps = useParams();
  let { group, page } = linkProps;
  textbookState.setPage(group, page);
  useEffect(() => {
    textbookState.getCurrentWords();
  }, [group, page]);

  return (
    <>
      <Navigation />
      <div className={style.contentContainer}>
        <div className={style.titleContainer}>
          <h1>Учебник</h1>
          <div>
            Группа:
            {textbookState.wordGroup !== 6
              ? textbookState.wordGroup + 1
              : 'сложные слова'}
          </div>
          <div>Страница: {textbookState.wordPage + 1}</div>
        </div>

        {textbookState.wordGroup !== 6 && (
          <CardContainer
            wordsCollection={toJS(textbookState.currentWords)}
            cardStyle={cardStyle}
          />
        )}

        {textbookState.wordGroup === 6 && (
          <CardContainer
            wordsCollection={toJS(textbookState.difficultWords)}
            cardStyle={cardStyle}
          />
        )}
      </div>
    </>
  );
});
