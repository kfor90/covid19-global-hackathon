import { StatisticsState, StatisticsCollection } from './stats.state';
import { createSelector } from '@ngrx/store';

import { selectFeatures, FeaturesState } from '../../../features.state';

export interface SelectStatisticProp {
    country: string;
}

export const selectStats = createSelector(
    selectFeatures,
    (state: FeaturesState) => state.stats
);

export const selectAllStatistics = createSelector(
    selectStats,
    (state: StatisticsState) => state.data
);

export const selectSelectedCountryId = createSelector(
    selectStats,
    (state: StatisticsState) => state.selectedCountryId
);

export const selectSelectedCountryStatistic = createSelector(
    selectAllStatistics,
    selectSelectedCountryId,
    (state: StatisticsCollection, id: string) => state[id]
);

export const selectStatistic = createSelector(
    selectStats,
    (state: StatisticsState, props: SelectStatisticProp) => state[props.country]
);
