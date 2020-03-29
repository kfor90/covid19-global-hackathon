import { createAction, props } from '@ngrx/store';
import { Statistic } from './stats.state';

export const homePageSetStats = createAction(
    '[Home Page] Set stats',
    props<{ stats: Statistic[] }>()
);

export const homePageSetSelectedCountryId = createAction(
    '[Home Page] Set selected country id',
    props<{ country: string }>()
);

export const homePageSetSelectedCountryIdError = createAction(
    '[Home Page] Set selected country id error'
);

export const homePageFetchStatsError = createAction(
    '[Home Page] Fetch stats error'
);

export const homePageFetchStats = createAction('[Home Page] Fetch stats');
