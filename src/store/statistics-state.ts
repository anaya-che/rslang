import { observable, action, toJS } from 'mobx';
import { userState } from '.';
import { getStatistics, updateStatistics } from '../api';
import { IGameStatistic, IStatisticOptional } from '../utils/interfaces';
import { uniqueValues } from '../utils/statistics-helpers/unique-values';

export const statisticsState = observable({
  statistics: {} as IStatisticOptional,

  getCurrentStatistics: action(async () => {
    const data = await getStatistics(userState.tokenInfo.userId);
    if (data) statisticsState.statistics = data.optional;
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
      const oldGameInfo: IGameStatistic = statObj[date][game];
      const wordIdArr = oldGameInfo.learnedWordsId.concat(
        gameInfo.learnedWordsId
      );
      const uniqueWordId = uniqueValues(wordIdArr);

      const newGameInfo = {
        gamesCount: oldGameInfo.gamesCount + gameInfo.gamesCount,
        bestSeries:
          oldGameInfo.bestSeries > gameInfo.bestSeries
            ? oldGameInfo.bestSeries
            : gameInfo.bestSeries,
        totalWins: oldGameInfo.totalWins + gameInfo.totalWins,
        totalMistakes: oldGameInfo.totalMistakes + gameInfo.totalMistakes,
        learnedWordsId: uniqueWordId,
      };

      statObj[date][game] = newGameInfo;
      await updateStatistics(userState.tokenInfo.userId, learnedWords, statObj);
      await statisticsState.getCurrentStatistics();
    }
  ),
});
