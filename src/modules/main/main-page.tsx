import { appState } from '../../store';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

export const MainPage = observer(() => {
  return (
    <div>
      Main Page
      <div onClick={() => appState.setPage('main')}>
        <Link to="/">Main</Link>
      </div>
      <div onClick={() => appState.setPage('authorization')}>
        <Link to="/user">Authorization</Link>
      </div>
      <div onClick={() => appState.setPage('sprint')}>
        <Link to="/games/sprint">Sprint</Link>
      </div>
      <div onClick={() => appState.setPage('audiocall')}>
        <Link to="/games/audiocall">Audiocall</Link>
      </div>
      <div onClick={() => appState.setPage('textbook')}>
        <Link to="/textbook">Textbook</Link>
      </div>
      <div onClick={() => appState.setPage('statistics')}>
        <Link to="/statistics">Statistics</Link>
      </div>
    </div>
  );
});
