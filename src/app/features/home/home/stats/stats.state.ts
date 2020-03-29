export interface Case {
    // e.g. 'm/d/yy': 5
    [date: string]: number;
}

export interface TimeLine {
    cases: Case;
    deaths: Case;
}

export interface Statistic {
    country: string;
    province: string;
    timeline: TimeLine;
}

export interface StatisticsCollection {
    [id: string]: Statistic;
}

export interface StatisticsState {
    data: StatisticsCollection;
    selectedCountryId: string;
}
