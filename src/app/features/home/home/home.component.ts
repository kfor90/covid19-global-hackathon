import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State } from '../../features.state';
import {
    selectSelectedCountryStatistic,
    selectAllStatistics
} from './stats/stats.selectors';
import { Statistic, StatisticsCollection } from './stats/stats.state';
import { homePageFetchStats } from './stats/stats.actions';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    countryStatistic: Observable<Statistic>;
    allStats: Observable<StatisticsCollection>;
    displayAllStats: boolean;

    constructor(private store: Store<State>) {
        this.displayAllStats = false;
    }

    ngOnInit(): void {
        this.store.dispatch(homePageFetchStats());
        this.countryStatistic = this.store.pipe(
            select(selectSelectedCountryStatistic)
        );
        this.allStats = this.store.pipe(select(selectAllStatistics));
    }

    showAllStats(): void {
        this.displayAllStats = !this.displayAllStats;
    }
}
