import { observable, action, toJS } from 'mobx';
import { userState } from '.';
import { getStatistics, updateStatistics } from '../api';
import {
  IGameStatistic,
  IPageStatistic,
  IStatisticOptional,
} from '../utils/interfaces';
import { getLearnedWords } from '../utils/statistics-helpers/learned-words';
import { uniqueValues } from '../utils/statistics-helpers/unique-values';

export const statisticsState = observable({
  statistics: {} as IStatisticOptional,
  todayWordsStatistics: {} as IPageStatistic,
  todayAudiocallStatistics: {} as IPageStatistic,
  todaySprintStatistics: {} as IPageStatistic,

  getCurrentStatistics: action(async () => {
    const data = await getStatistics(userState.tokenInfo.userId);
    if (data !== undefined) {
      statisticsState.statistics = data.optional;
      statisticsState.setStatisticForToday();
    } else {
      await statisticsState.createStatisticForToday();
    }
  }),

  setStatisticForToday: action(() => {
    const curDate: Date = new Date();
    let textDate: string = curDate.toLocaleString('en-GB', {
      dateStyle: 'short',
    });
    const audoicallStats = statisticsState.statistics[textDate]['audiocall'];
    let audiocallPercent = 0;
    if (audoicallStats.totalMistakes !== 0)
      audiocallPercent =
        (audoicallStats.totalWins / audoicallStats.totalMistakes) * 100;
    statisticsState.todayAudiocallStatistics = {
      newWords: audoicallStats.newWords,
      learnedWords: audoicallStats.learnedWordsId.length,
      percentOfAnswers: audiocallPercent,
    };

    const sprintStats = statisticsState.statistics[textDate]['sprint'];
    let sprintPercent = 0;
    if (sprintStats.totalMistakes !== 0) {
      sprintPercent = (sprintStats.totalWins / sprintStats.totalMistakes) * 100;
    }
    statisticsState.todaySprintStatistics = {
      newWords: sprintStats.newWords,
      learnedWords: sprintStats.learnedWordsId.length,
      percentOfAnswers: sprintPercent,
    };

    let totalPercent = 0;
    if (audoicallStats.totalMistakes + sprintStats.totalMistakes !== 0) {
      totalPercent =
        ((sprintStats.totalWins + audoicallStats.totalWins) /
          (sprintStats.totalMistakes + audoicallStats.totalMistakes)) *
        100;
    }
    statisticsState.todayWordsStatistics = {
      newWords: sprintStats.newWords + audoicallStats.newWords,
      learnedWords:
        sprintStats.learnedWordsId.length +
        audoicallStats.learnedWordsId.length,
      percentOfAnswers: totalPercent,
    };
  }),

  createStatisticForToday: action(async () => {
    const learnedWords = 0;
    const curDate: Date = new Date();
    let textDate: string = curDate.toLocaleString('en-GB', {
      dateStyle: 'short',
    });
    const emptyStats = {
      gamesCount: 0,
      newWords: 0,
      bestSeries: 0,
      totalWins: 0,
      totalMistakes: 0,
      learnedWordsId: [],
    };
    const newStatistics = {
      [textDate]: {
        audiocall: emptyStats,
        sprint: emptyStats,
      },
    };
    const data = await updateStatistics(
      userState.tokenInfo.userId,
      learnedWords,
      newStatistics
    );
    if (data !== undefined) {
      statisticsState.statistics = data.optional;
      statisticsState.setStatisticForToday();
    }
  }),

  updateStatistics: action(
    async (
      date: string,
      game: 'audiocall' | 'sprint',
      gameInfo: IGameStatistic
    ) => {
      await statisticsState.getCurrentStatistics();
      const learnedWords = 0;
      const statObj = { ...toJS(statisticsState.statistics) };
      if (statObj[date] !== undefined) {
        const oldGameInfo: IGameStatistic = statObj[date][game];
        if (oldGameInfo !== undefined) {
          const wordIdArr = oldGameInfo.learnedWordsId.concat(
            gameInfo.learnedWordsId
          );
          const uniqueWordId = uniqueValues(wordIdArr);
          const learnedWordId = await getLearnedWords(uniqueWordId);
          const newGameInfo = {
            gamesCount: oldGameInfo.gamesCount + gameInfo.gamesCount,
            newWords: oldGameInfo.newWords + gameInfo.newWords,
            bestSeries:
              oldGameInfo.bestSeries > gameInfo.bestSeries
                ? oldGameInfo.bestSeries
                : gameInfo.bestSeries,
            totalWins: oldGameInfo.totalWins + gameInfo.totalWins,
            totalMistakes: oldGameInfo.totalMistakes + gameInfo.totalMistakes,
            learnedWordsId: learnedWordId,
          };
          statObj[date][game] = newGameInfo;
        } else statObj[date][game] = gameInfo;
      } else statObj[date] = { [game]: gameInfo };

      await updateStatistics(userState.tokenInfo.userId, learnedWords, statObj);
      await statisticsState.getCurrentStatistics();
    }
  ),
});