import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';

// amchart
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

// local
import { DateInfection } from './date-infections.inteface';
import { TimelineService } from './timeline.service';

am4core.useTheme(am4themes_animated);

@Component({
    selector: 'app-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit, OnDestroy {
    public chart: am4charts.XYChart;
    private fetchedData: any;

    public dateInfections: { [key: string]: number };
    public chartData: DateInfection[];

    constructor(private zone: NgZone, private service: TimelineService) {
        this.dateInfections = {};
        this.chartData = [];
    }

    ngOnInit(): void {
        Promise.all([this.getAndPopulateData()]).then(() => {
            this.setInfectionsByDate();
            this.setChartData();
            this.createGraph();
        });
    }

    createGraph(): void {
        this.zone.runOutsideAngular(() => {
            let chart = am4core.create('chartdiv', am4charts.XYChart);

            // axis
            let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = 'date';
            categoryAxis.title.text = 'Date';

            let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.title.text = 'Infections';

            // set data
            let series = chart.series.push(new am4charts.LineSeries());
            series.dataFields.valueY = 'infections';
            series.dataFields.categoryX = 'date';
            chart.data = this.chartData;

            this.chart = chart;
        });
    }

    ngOnDestroy(): void {
        this.zone.runOutsideAngular(() => {
            if (this.chart) {
                this.chart.dispose();
            }
        });
    }

    private async;

    private async getAndPopulateData(): Promise<any> {
        this.fetchedData = await this.service.getHistoricalData().toPromise();
    }

    private setInfectionsByDate(): void {
        for (const country of this.fetchedData) {
            for (const cases of Object.entries(country.timeline.cases)) {
                this.dateInfections[cases[0]] =
                    this.dateInfections[cases[0]] + Number(cases[1]) ||
                    Number(cases[1]);
            }
        }
    }

    private setChartData(): any {
        const data = [];
        for (const entry of Object.entries(this.dateInfections)) {
            const dayData = {
                date: entry[0],
                infections: entry[1]
            };

            data.push(dayData);
        }
        this.chartData = data;
    }
}
