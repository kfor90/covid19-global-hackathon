import { Params } from '@angular/router';
import { createFeatureSelector } from '@ngrx/store';

import { RouterReducerState, getSelectors } from '@ngrx/router-store';
import { AppState } from '../core.state';

export const FEATURE_NAME = 'router';

export const selectRouter = createFeatureSelector<
    State,
    RouterReducerState<RouterStateUrl>
>(FEATURE_NAME);

export interface RouterStateUrl {
    url: string;
    params: Params;
    queryParams: Params;
}

export interface State extends AppState {
    router: RouterReducerState<RouterStateUrl>;
}
