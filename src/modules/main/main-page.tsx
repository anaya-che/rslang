import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { Content } from './components/content';
// import style from '../../index.scss';

export const MainPage = observer(() => {


  return (
    <div className='wrapper'>
      <Header />
      <Content />
      <Footer />
    </div>
  );
});
