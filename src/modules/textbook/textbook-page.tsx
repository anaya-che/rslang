import { observer } from 'mobx-react-lite';
import style from './textbook.module.scss';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { Content } from './components/content';

export const TextbookPage: React.FC = observer(() => {
  return (
    <>
      <Header />
      <Content />
      <Footer />
    </>
  );
});
