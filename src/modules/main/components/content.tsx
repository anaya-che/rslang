import style from '../main.module.scss';

export const Content = () => {
  return (
    <div className="content">
      <div className={style.main}>
        <section className={style.appInfo}>
          <div className={style.description}>
            <div className={style.descriptionText}>
              <h1>
                <span>RS</span>Lang
              </h1>
              <p>
                Интерактивное приложение для изучения английского языка, которое
                поможет в лёгкой игровой форме повысить свой уровень
                английского. Наши преимущества:
              </p>
              <p>
                <img
                  src="../../../../icons/bullet.svg"
                  width="15px"
                  height="15px"
                  alt=""
                />{' '}
                начать занятия можно с любым уровнем знаний!
              </p>
              <p>
                <img
                  src="../../../../icons/bullet.svg"
                  width="15px"
                  height="15px"
                  alt=""
                />{' '}
                обучение построено на 6 ступенях сложности, выбери свою!
              </p>
              <p>
                <img
                  src="../../../../icons/bullet.svg"
                  width="15px"
                  height="15px"
                  alt=""
                />{' '}
                увлекательные тренировки помогут улучшить и закрепить свой
                словарный запас!
              </p>
              <p>
                <img
                  src="../../../../icons/bullet.svg"
                  width="15px"
                  height="15px"
                  alt=""
                />{' '}
                повторяй сложные слова для быстрого запоминания!
              </p>
              <p>
                <img
                  src="../../../../icons/bullet.svg"
                  width="15px"
                  height="15px"
                  alt=""
                />{' '}
                отслеживай свой прогресс ежедневно и ставь новые цели!
              </p>
            </div>

            <div className={style.teamsImg}>
              <img
                src="../../../../img/main-page.jpg"
                width="100%"
                alt="team"
              />
            </div>
          </div>
        </section>

        <section>
          <h2 className={style.aboutTeamLogo}>О команде:</h2>
          <div className={style.team}>
            <div className={style.developer}>
              <div className={style.avatar}>
                <img src="../../../../img/anastasia.jpg" width="160px" alt="" />
              </div>
              <div className={style.developerInfo}>
                <h3>Анастасия</h3>
                <h4>Team lead, front-end developer</h4>
                <p>
                  Координация команды, разработка архитектуры, текстбук,
                  авторизация, краткосрочная статистика, дизайн.
                </p>
              </div>
            </div>
            <div className={style.developer}>
              <div className={style.avatar}>
                <img src="../../../../img/maria.png" width="160px" alt="" />
              </div>
              <div className={style.developerInfo}>
                <h3>Мария</h3>
                <h4>Front-end developer</h4>
                <p>Разработка игры Спринт, дизайн.</p>
              </div>
            </div>
            <div className={style.developer}>
              <div className={style.avatar}>
                <img src="../../../../img/andrew.jpg" width="160px" alt="" />
              </div>
              <div className={style.developerInfo}>
                <h3>Андрей</h3>
                <h4>Front-end developer</h4>
                <p>Разработка игры Аудиовызов, долгосрочная статистика.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
