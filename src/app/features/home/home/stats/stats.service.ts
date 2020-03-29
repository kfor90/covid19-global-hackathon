import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Statistic } from './stats.state';
import { Observable } from 'rxjs';

const BASE = 'https://corona.lmao.ninja/v2';

const Endpoints = {
    All: `${BASE}/historical`
};

@Injectable({
    providedIn: 'root'
})
export class StatsService {
    constructor(private http: HttpClient) {}

    findAll(): Observable<Statistic[]> {
        return this.http.get<Statistic[]>(Endpoints.All);
    }
}
