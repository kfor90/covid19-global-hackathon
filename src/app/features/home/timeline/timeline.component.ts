import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';

// ngrx
import { Store, select } from '@ngrx/store';

// amchart
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

// local
import { DateInfection } from './interfaces/date-infections.inteface';
import { DateDeath } from './interfaces/date-deaths.interface';
import { selectAllStatistics } from '../home/stats/stats.selectors';
import { StatisticsCollection } from '../home/stats/stats.state';
import { combineLatest } from 'rxjs';

am4core.useTheme(am4themes_animated);

@Component({
    selector: 'app-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit, OnDestroy {
    public chart: am4charts.XYChart;
    private fetchedData: any;

    public infectionsByDate: { [key: string]: number };
    public deathsByDate: { [key: string]: number };

    public infectionsChartData: DateInfection[];
    public deathsChartData: DateDeath[];

    public stats: StatisticsCollection;

    constructor(private zone: NgZone, private store: Store) {
        this.infectionsByDate = {};
        this.deathsByDate = {};

        this.infectionsChartData = [];
        this.deathsChartData = [];
    }

    ngOnInit(): void {
        combineLatest([this.getData()]).subscribe(([statistics]) => {
            if (statistics && Object.keys(statistics).length > 0) {
                this.stats = statistics as StatisticsCollection;
                this.setInfectionsByDate();
                this.setInfectionChartData();
                this.setDeathsByDate();
                this.setDeathChartData();
                this.createGraph();
            }
        });
    }

    ngOnDestroy(): void {
        this.zone.runOutsideAngular(() => {
            if (this.chart) {
                this.chart.dispose();
            }
        });
    }

    private getData(): any {
        return this.store.pipe(select(selectAllStatistics));
    }

    private createGraph(): void {
        this.zone.runOutsideAngular(() => {
            let chart = am4core.create('chartdiv', am4charts.XYChart);

            // axis
            let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            dateAxis.dateFormatter = new am4core.DateFormatter();
            dateAxis.dateFormatter.dateFormat = 'MM-dd-yyyy';

            let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

            // infection data
            let infectionSeries = chart.series.push(new am4charts.LineSeries());
            infectionSeries.dataFields.valueY = 'infections';
            infectionSeries.dataFields.dateX = 'date';
            infectionSeries.legendSettings.labelText = 'Total Infections';

            infectionSeries.data = this.infectionsChartData;

            // death data
            let deathSeries = chart.series.push(new am4charts.LineSeries());
            deathSeries.dataFields.valueY = 'deaths';
            deathSeries.dataFields.dateX = 'date';
            deathSeries.data = this.deathsChartData;
            deathSeries.legendSettings.labelText = 'Total Deaths';

            chart.legend = new am4charts.Legend();

            this.chart = chart;
        });
    }

    private setInfectionsByDate(): void {
        for (const country of Object.values(this.stats)) {
            for (const cases of Object.entries(country.timeline.cases)) {
                this.infectionsByDate[cases[0]] =
                    this.infectionsByDate[cases[0]] + Number(cases[1]) ||
                    Number(cases[1]);
            }
        }
    }

    private setInfectionChartData(): any {
        const data = [];
        for (const entry of Object.entries(this.infectionsByDate)) {
            const dayData = {
                date: entry[0],
                infections: entry[1]
            };

            data.push(dayData);
        }
        this.infectionsChartData = data;
    }
    private setDeathsByDate(): void {
        for (const country of Object.values(this.stats)) {
            for (const cases of Object.entries(country.timeline.deaths)) {
                this.deathsByDate[cases[0]] =
                    this.deathsByDate[cases[0]] + Number(cases[1]) ||
                    Number(cases[1]);
            }
        }
    }

    private setDeathChartData(): any {
        const data = [];
        for (const entry of Object.entries(this.deathsByDate)) {
            const dayData = {
                date: entry[0],
                deaths: entry[1]
            };

            data.push(dayData);
        }
        this.deathsChartData = data;
    }
}
