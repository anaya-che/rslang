import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { UserPage } from './modules/user/user-page';
import { AudiocallPage } from './modules/games/audiocall/audiocall-page';
import { SprintPage } from './modules/games/sprint/sprint-page';
import { MainPage } from './modules/main/main-page';
import { StatisticsPage } from './modules/statistics/statistics-page';
import { TextbookPage } from './modules/textbook/textbook-page';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/games/sprint">
            <SprintPage />
          </Route>
          <Route path="/games/audiocall">
            <AudiocallPage />
          </Route>
          <Route path="/textbook/:group/:page">
            <TextbookPage />
          </Route>
          <Route path="/statistics">
            <StatisticsPage />
          </Route>
          <Route path="/user">
            <UserPage />
          </Route>
          <Route path="/">
            <MainPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
