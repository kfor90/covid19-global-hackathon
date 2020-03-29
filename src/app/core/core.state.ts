import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import { SettingsState } from './settings/settings.state';
import { settingsReducer } from './settings/settings.reducer';
import { RouterStateUrl } from './router/router.state';

export const reducers: ActionReducerMap<AppState> = {
    settings: settingsReducer,
    router: routerReducer
};

export interface AppState {
    settings: SettingsState;
    router: RouterReducerState<RouterStateUrl>;
}
