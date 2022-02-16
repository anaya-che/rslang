import { observable, action, toJS } from 'mobx';
import { userState } from '.';
import { getStatistics, updateStatistics } from '../api';
import { IStatisticOptional } from '../utils/interfaces';

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
      gameInfo: any
    ) => {
      await statisticsState.getCurrentStatistics();
      const learnedWords = 0;
      const statObj = { ...toJS(statisticsState.statistics) };
      statObj[date][game] = gameInfo;
      await updateStatistics(userState.tokenInfo.userId, learnedWords, statObj);
      await statisticsState.getCurrentStatistics();
    }
  ),
});
