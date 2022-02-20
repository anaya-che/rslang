import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { textbookState } from '../../../store';
import { sprintState } from '../../../store/sprint-state';
import { Header } from '../../../components/header/header';
import { Categories } from './components/categories';
import { Game } from './components/game';
import style from './components/sprint.module.scss';

export const SprintPage: React.FC = observer(() => {
  return (
    <div className='wrapper'>
      
      <Header />
      <div className={style.sprintPage}>
        {sprintState.isGame && sprintState.currentWord !== null ? (
          <Game />
        ) : (
          <Categories />
        )}
      </div>
    </div>
  );
});


{/* <header>
        <button onClick={sprintState.setDefault}>
          <Link to="/">Main</Link>
        </button>
        <button
          onClick={() => {
            sprintState.setDefault();
          }}
        >
          <Link to={`/textbook/${textbookState.wordGroup + 1}/${textbookState.wordPage + 1}`}>Textbook</Link>
        </button>
      </header> */}