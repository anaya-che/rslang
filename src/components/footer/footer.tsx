import style from './footer.module.scss';

export const Footer = () => {
  return (
    <div className={style.footer}>
      <div>
        <div className={style.github}></div>
        <div className={style.link}><a href="https://github.com/anaya-che">Анастасия</a></div>
        <div className={style.link}><a href="https://github.com/FilionchykMaryia">Мария</a></div>
        <div className={style.link}><a href="https://github.com/helacyan">Андрей</a></div>
      </div>
      <div>©2022</div>
      <div className={style.rss}><a href="https://rs.school/js/">rs</a></div>
    </div>
  );
};