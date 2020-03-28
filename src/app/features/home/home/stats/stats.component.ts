import { Component, OnInit } from '@angular/core';

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
    deathsTotal: number;

    constructor() {}

    ngOnInit(): void {}
}
