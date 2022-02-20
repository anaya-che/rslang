import { observer } from 'mobx-react-lite';
import { Header } from './components/header';
import { Content } from './components/content';
import { Footer } from '../../components/footer/footer';


export const MainPage = observer(() => {
  return (
    <div className='wrapper'>
      <Header />
      <Content />
      <Footer />
    </div>
  );
});
