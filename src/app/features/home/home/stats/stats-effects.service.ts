import { selectRouteParam } from './../../../../core/router/router.selectors';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
    RouterNavigatedAction,
    routerNavigatedAction
} from '@ngrx/router-store';
import { of } from 'rxjs';
import {
    mergeMap,
    map,
    catchError,
    filter,
    concatMap,
    tap
} from 'rxjs/operators';

import * as statsActions from './stats.actions';
import { StatsService } from './stats.service';
import { Statistic } from './stats.state';
import { State } from 'src/app/features/features.state';

@Injectable({
    providedIn: 'root'
})
export class StatsEffects {
    constructor(
        private actions$: Actions,
        private store: Store<State>,
        private statsService: StatsService
    ) {}

    fetchStats$ = createEffect(() =>
        this.actions$.pipe(
            ofType(statsActions.homePageFetchStats),
            mergeMap(() =>
                this.statsService.findAll().pipe(
                    map((stats: Statistic[]) =>
                        statsActions.homePageSetStats({ stats })
                    ),
                    catchError(() => of(statsActions.homePageFetchStatsError))
                )
            )
        )
    );

    countryPage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigatedAction),
            concatMap((event: RouterNavigatedAction<any>) =>
                this.store.pipe(select(selectRouteParam, { name: 'country' }))
            ),
            tap((country) =>
                country
                    ? undefined
                    : this.store.dispatch(
                          statsActions.homePageSetSelectedCountryId({
                              country: null
                          })
                      )
            ),
            filter((country) => country && country.length),
            map((country: string) =>
                statsActions.homePageSetSelectedCountryId({ country })
            )
        )
    );
}
