import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { longTermState } from '../../store/long-term-state';

export const MainPage = observer(() => {


  return (
    <div>
      Main Page
      <div>
        <Link to="/">Main</Link>
      </div>
      <div>
        <Link to="/user">Authorization</Link>
      </div>
      <div>
        <Link to="/games/sprint">Sprint</Link>
      </div>
      <div>
        <Link to="/games/audiocall">Audiocall</Link>
      </div>
      <div>
        <Link to="/textbook/1/1">Textbook</Link>
      </div>
      <div>
        <Link to="/statistics">Statistics</Link>
      </div>
    </div>
  );
});
