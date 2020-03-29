import {
    ChangeDetectorRef,
    Component,
    Input,
    OnChanges,
    OnInit
} from '@angular/core';

@Component({
    selector: 'app-stat',
    templateUrl: './stat.component.html',
    styleUrls: ['./stat.component.scss']
})
export class StatComponent implements OnInit, OnChanges {
    @Input() title: string;
    @Input() incidentsTotal: number;
    @Input() incidentsToday: number;
    @Input() color: string;

    percentChange: string;

    constructor(private cd: ChangeDetectorRef) {}

    ngOnInit(): void {}

    ngOnChanges(): void {
        this.percentChange = (
            (this.incidentsToday / this.incidentsTotal) *
            100
        ).toFixed(2);
        this.cd.detectChanges();
    }
}
