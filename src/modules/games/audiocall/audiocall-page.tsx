import React from 'react';
import { audiocallState } from "./../../../store/audiocall-state";
import { observer } from 'mobx-react-lite';
import { CreateAudioCallGame } from './components/game-page/page';
import { Header } from '../../main/components/header';
import { Footer } from '../../../components/footer/footer';
import style from './audiocall.module.scss';
import zxc from '../audiocall/audiocall-page-styles/categories.module.scss'
import { Link } from 'react-router-dom';

export const  AudiocallPage = observer(()=> {

  async function handleStart (category: number) {
    await audiocallState.setCategory(category)
    audiocallState.isSimpleGame = true
    audiocallState.counterConditionValue = 11
    audiocallState.setStart()
  }

  return <><Header /><div id='audio-game' className={style.audiocallPage}>
    {audiocallState.isStarted ? <button className={style.exitBtn} onClick={() => audiocallState.setDefault()}><Link to="/"></Link></button> : null }
    {!audiocallState.isStarted ?
      <><div className={zxc.categories}>
            <h1>Audiocall</h1>
          <div className={zxc.categoriesBtnGroup}>
            <button className={zxc.categoriesBtn} onClick={() => handleStart(0)}>1</button>
            <button className={zxc.categoriesBtn} onClick={() => handleStart(1)}>2</button>
            <button className={zxc.categoriesBtn} onClick={() => handleStart(2)}>3</button>
            <button className={zxc.categoriesBtn} onClick={() => handleStart(3)}>4</button>
            <button className={zxc.categoriesBtn} onClick={() => handleStart(4)}>5</button>
            <button className={zxc.categoriesBtn} onClick={() => handleStart(5)}>6</button>
          </div>
      </div></>
      : null}
    <div id='audio-call'>
      {audiocallState.isStarted ? <CreateAudioCallGame /> : null}
    </div>
  </div>
  <Footer/>
  </>

})
