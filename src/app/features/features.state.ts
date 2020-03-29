import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';

import { AppState } from 'src/app/core/core.state';
import { StatisticsState } from './home/home/stats/stats.state';
import { statsReducer } from './home/home/stats/stats.reducer';

export const FEATURE_NAME = 'features';

export const selectFeatures = createFeatureSelector<State, FeaturesState>(
    FEATURE_NAME
);

export const reducers: ActionReducerMap<FeaturesState> = {
    stats: statsReducer
};

export interface FeaturesState {
    stats: StatisticsState;
}

export interface State extends AppState {
    features: FeaturesState;
}
