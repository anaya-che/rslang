import style from './footer.module.scss';

export const Footer = () => {
  return (
    <div className={style.footer}>
      <div>
        <div className={style.github}></div>
        <div className={style.link}>
          <a
            href="https://github.com/anaya-che"
            target="_blank"
            rel="noreferrer"
          >
            Анастасия
          </a>
        </div>
        <div className={style.link}>
          <a
            href="https://github.com/FilionchykMaryia"
            target="_blank"
            rel="noreferrer"
          >
            Мария
          </a>
        </div>
        <div className={style.link}>
          <a
            href="https://github.com/helacyan"
            target="_blank"
            rel="noreferrer"
          >
            Андрей
          </a>
        </div>
      </div>
      <div>© 2022</div>
      <a href="https://rs.school/js/" target="_blank" rel="noreferrer">
        <div className={style.rss}></div>
      </a>
    </div>
  );
};
