import { appState } from '../../store';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

export const MainPage = observer(() => {
  return (
    <div>
      Main Page
      <div onClick={() => appState.setPage()}>
        <Link to="/">Main</Link>
      </div>
      <div onClick={() => appState.setPage()}>
        <Link to="/user">Authorization</Link>
      </div>
      <div onClick={() => appState.setPage()}>
        <Link to="/games/sprint">Sprint</Link>
      </div>
      <div onClick={() => appState.setPage()}>
        <Link to="/games/audiocall">Audiocall</Link>
      </div>
      <div onClick={() => appState.setPage()}>
        <Link to="/textbook/1/1">Textbook</Link>
      </div>
      <div onClick={() => appState.setPage()}>
        <Link to="/statistics">Statistics</Link>
      </div>
    </div>
  );
});
