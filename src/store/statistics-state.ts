import { observable, action, toJS } from 'mobx';
import { userState } from '.';
import { getStatistics, updateStatistics } from '../api';
import { IGameStatistic, IStatisticOptional } from '../utils/interfaces';
import { getLearnedWords } from '../utils/statistics-helpers/learned-words';
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
      if (oldGameInfo) {
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

      await updateStatistics(userState.tokenInfo.userId, learnedWords, statObj);
      await statisticsState.getCurrentStatistics();
    }
  ),
});
