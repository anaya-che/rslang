import { Link } from 'react-router-dom';
import style from '../main.module.scss';

export const Content = () => {
  return (
    <div className='content'>
      <div className={style.main}>
        <h1><span>RS</span>Lang</h1>
        <div className={style.description}>
          <div className={style.descriptionText}>
            <p>
            Интерактивное приложение для изучения английского языка, которое поможет в лёгкой игровой форме повысить свой уровень английского. Наши преимущества:
            </p>
            <p><img src="../../../../icons/bullet.svg" width='20px' height='20px' alt="" /> начать занятия можно с любым уровнем знаний!</p>
            <p><img src="../../../../icons/bullet.svg" width='20px' height='20px' alt="" /> обучение построено на 6 ступенях сложности, выбери свою!</p>
            <p><img src="../../../../icons/bullet.svg" width='20px' height='20px' alt="" /> увлекательные тренировки помогут улучшить и закрепить свой словарный запас!</p>
            <p><img src="../../../../icons/bullet.svg" width='20px' height='20px' alt="" /> повторяй сложные слова для быстрого запоминания!</p>
            <p><img src="../../../../icons/bullet.svg" width='20px' height='20px' alt="" /> отслеживай свой прогресс ежедневно и ставь новые цели!</p>
          </div>
          <div>
            <img src="../../../../img/main-page.jpg" width="100%" alt="team" />
          </div>
        </div>
        <div>О команде:</div>
        <div className={style.team}>
          <div className={style.developer}>
            <div className={style.avatar}>
              <img src="../../../../img/anastasia.jpg" width='160px'  alt="" />
            </div>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima doloribus incidunt nam, est consequatur cupiditate officia nemo? Excepturi, dignissimos, officia est totam obcaecati, magnam recusandae distinctio qui quisquam tempore enim.</div>
          </div>
          <div className={style.developer}>
            <div className={style.avatar}>
              <img src="../../../../img/maria.jpg" width='160px'  alt="" />
            </div>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima doloribus incidunt nam, est consequatur cupiditate officia nemo? Excepturi, dignissimos, officia est totam obcaecati, magnam recusandae distinctio qui quisquam tempore enim.</div>
          </div>
          <div className={style.developer}>
            <div className={style.avatar}>
              <img src="../../../../img/andrew.jpg" width='160px'  alt="" />
            </div>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima doloribus incidunt nam, est consequatur cupiditate officia nemo? Excepturi, dignissimos, officia est totam obcaecati, magnam recusandae distinctio qui quisquam tempore enim.</div>
          </div>
          </div>
        
      </div>
      
    </div>
  );
};