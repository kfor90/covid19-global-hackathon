import { createAction, props } from '@ngrx/store';

export const HomePageSetAuthenticated = createAction(
    '[Home Page] Set authenticated',
    props<{ authenticated: boolean }>()
);
