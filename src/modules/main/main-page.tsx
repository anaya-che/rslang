import { observer } from 'mobx-react-lite';
import { Header } from './components/header';
import { Content } from './components/content';
import { Footer } from '../../components/footer/footer';
import { UserPage } from '../user/user-page';
import { useState } from 'react';

export const MainPage = observer(() => {
  return (
    <div className="wrapper">
      <Header />
      <Content />

      <Footer />
    </div>
  );
});
