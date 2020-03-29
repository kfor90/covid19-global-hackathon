import { getSelectors, RouterReducerState } from '@ngrx/router-store';
import { selectRouter, RouterStateUrl } from './router.state';
import { createSelector } from '@ngrx/store';
import { Params } from '@angular/router';

export interface SelectParamProp {
    name: string;
}

export const selectUrl = createSelector(
    selectRouter,
    (state: RouterReducerState<RouterStateUrl>) => state.state.url
);

export const selectRouteParams = createSelector(
    selectRouter,
    (state: RouterReducerState<RouterStateUrl>) => state.state.params
);

export const selectRouteParam = createSelector(
    selectRouteParams,
    (state: Params, props: SelectParamProp) => state[props.name]
);

export const selectQueryParams = createSelector(
    selectRouter,
    (state: RouterReducerState<RouterStateUrl>) => state.state.queryParams
);

export const selectQueryParam = createSelector(
    selectQueryParams,
    (state: Params, props: SelectParamProp) => state[props.name]
);
