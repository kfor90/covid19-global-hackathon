import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { StatsService } from './stats.service';

@Component({
    selector: 'app-stats',
    templateUrl: './stats.component.html',
    styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
    infectionsToday: number;
    infectionsTotal: number;

    recoveriesToday: number;
    recoveriesTotal: number;

    criticalToday: number;
    criticalTotal: number;

    deathsToday: number;
    deathTotal: number;

    private subscription: Subscription;

    constructor(private statService: StatsService) {
        this.infectionsToday = 0;
        this.infectionsTotal = 0;
        this.recoveriesToday = 0;
        this.recoveriesTotal = 0;
        this.deathTotal = 0;
        this.deathsToday = 0;
        this.criticalToday = 0;
        this.criticalTotal = 0;
        this.subscription = new Subscription();
        this.getData();
    }
    ngOnInit(): void {}

    getData(): any {
        this.subscription.add(
            this.statService.getAllCountryData().subscribe({
                next: (countries) => this.calculateStats(countries)
            })
        );
    }

    calculateStats(countryDataSet: any[]): void {
        for (const dataSet of countryDataSet) {
            this.infectionsToday += dataSet.todayCases;
            this.infectionsTotal += dataSet.cases;
            this.recoveriesTotal += dataSet.recovered;
            this.deathTotal += dataSet.deaths;
            this.deathsToday += dataSet.todayDeaths;
            this.criticalTotal += dataSet.critical;
        }
    }
}
