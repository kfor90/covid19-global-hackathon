import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const API_ENDPOINT = 'https://corona.lmao.ninja/countries';

@Injectable({
    providedIn: 'root'
})
export class StatsService {
    constructor(private http: HttpClient) {}

    getAllCountryData(): Observable<any> {
        return this.http.get(API_ENDPOINT);
    }
}
