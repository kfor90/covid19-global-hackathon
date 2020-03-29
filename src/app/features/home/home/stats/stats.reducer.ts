import { createReducer, on, Action } from '@ngrx/store';

import { StatisticsState, Statistic } from './stats.state';
import {
    homePageSetStats,
    homePageSetSelectedCountryId
} from './stats.actions';

export const initialState: StatisticsState = {
    data: {},
    selectedCountryId: null
};

const reducer = createReducer(
    initialState,
    on(homePageSetStats, (state: StatisticsState, { stats }) => ({
        ...state,
        data: toMap(stats)
    })),
    on(homePageSetSelectedCountryId, (state: StatisticsState, { country }) => ({
        ...state,
        selectedCountryId: country
    }))
);

function toMap(stats: Statistic[]): { [id: string]: Statistic } {
    const map = {};

    stats.forEach((stat: Statistic) => {
        map[stat.country] = stat;
    });

    return map;
}

export function statsReducer(
    state: StatisticsState | undefined,
    action: Action
) {
    return reducer(state, action);
}
