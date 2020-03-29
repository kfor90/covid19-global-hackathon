import { HomePageSetAuthenticated } from './settings.actions';
import { SettingsState } from './settings.state';
import { createReducer, on, Action } from '@ngrx/store';

export const initialState: SettingsState = {
    authenticated: false
};

const reducer = createReducer(
    initialState,
    on(HomePageSetAuthenticated, (state: SettingsState, { authenticated }) => ({
        ...state,
        authenticated
    }))
);

export function settingsReducer(
    state: SettingsState | undefined,
    action: Action
) {
    return reducer(state, action);
}
