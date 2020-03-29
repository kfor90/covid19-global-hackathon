import { createFeatureSelector, createSelector } from '@ngrx/store';

import { SettingsState, State } from './settings.state';

export const FEATURE_NAME = 'settings';

export const selectSettings = createFeatureSelector<State, SettingsState>(
    FEATURE_NAME
);

export const selectAuthenticated = createSelector(
    selectSettings,
    (state: SettingsState) => state.authenticated
);
