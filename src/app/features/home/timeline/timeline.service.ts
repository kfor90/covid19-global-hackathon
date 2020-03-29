import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TimelineService {
    constructor(private http: HttpClient) {}

    getHistoricalData(): Observable<any> {
        return this.http.get('https://corona.lmao.ninja/v2/historical');
    }
}
