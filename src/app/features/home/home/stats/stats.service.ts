import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Statistic } from './stats.state';
import { Observable } from 'rxjs';

const BASE = 'https://corona.lmao.ninja/';

const Endpoints = {
    All: `${BASE}/v2/historical`,
    Countries: `${BASE}/countries`
};

@Injectable({
    providedIn: 'root'
})
export class StatsService {
    constructor(private http: HttpClient) {}

    findAll(): Observable<Statistic[]> {
        return this.http.get<Statistic[]>(Endpoints.All);
    }

    getAllCountryData(): Observable<any> {
        return this.http.get(Endpoints.Countries);
    }
}
