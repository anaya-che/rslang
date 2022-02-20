import React from 'react';
import { Link } from 'react-router-dom';
import {
  audiocallState,
  sprintState,
  textbookState,
  userState,
} from '../../../../store';
import {
  getNextPage,
  getPrevPage,
} from '../../../../utils/textbook-helpers/navigation';
import style from './navigation.module.scss';

export const Navigation: React.FC<{ group: string; page: string }> = (
  group,
  page
) => {
  return (
    <div className={style.navContainer}>
      <div className={style.pagination}>
        <Link to={`/textbook/${textbookState.wordGroup + 1}/${getPrevPage()}`}>
          <button>prev</button>
        </Link>
        <Link to={`/textbook/${textbookState.wordGroup + 1}/${getNextPage()}`}>
          <button>next</button>
        </Link>
        <Link to="/games/audiocall">
          <button
            id="textbook-audiocall"
            onClick={audiocallState.handleAudiocallStart}
          >
            Аудиовызов
          </button>
        </Link>
        <Link to="/games/sprint">
          <button
            id="textbook-sprint"
            onClick={async () =>
              sprintState.startFromTextbook(+group - 1, +page - 1)
            }
          >
            Спринт
          </button>
        </Link>
      </div>
      <div className={style.groupsContainer}>
        <Link to="/textbook/1/1">
          <button className={style.categoriesBtn + ' ' + style.categorie1}>
            1
          </button>
        </Link>
        <Link to="/textbook/2/1">
          <button className={style.categoriesBtn + ' ' + style.categorie2}>
            2
          </button>
        </Link>
        <Link to="/textbook/3/1">
          <button className={style.categoriesBtn + ' ' + style.categorie3}>
            3
          </button>
        </Link>
        <Link to="/textbook/4/1">
          <button className={style.categoriesBtn + ' ' + style.categorie4}>
            4
          </button>
        </Link>
        <Link to="/textbook/5/1">
          <button className={style.categoriesBtn + ' ' + style.categorie5}>
            5
          </button>
        </Link>
        <Link to="/textbook/6/1">
          <button className={style.categoriesBtn + ' ' + style.categorie6}>
            6
          </button>
        </Link>
        {userState.isAuthorized && (
          <Link to="/textbook/7/1">
            <button className={style.difficultBtn}>Сложные слова</button>
          </Link>
        )}
      </div>
    </div>
  );
};
