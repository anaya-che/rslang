import { observer } from 'mobx-react-lite';
import { Header } from './components/header';
import { Content } from './components/content';
import { Footer } from '../../components/footer/footer';

import { useState } from 'react';
import { UserContent } from '../user/components/user-content';

export const MainPage = observer(() => {
  const [userActive, setUserActive] = useState(false);
  return (
    <div className="wrapper">
      <Header active={userActive} setActive={setUserActive} />
      <Content />
      <UserContent active={userActive} setActive={setUserActive} />
      <Footer />
    </div>
  );
});
