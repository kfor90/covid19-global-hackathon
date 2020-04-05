import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { StatsComponent } from './home/stats/stats.component';
import { StatComponent } from './home/stats/stat/stat.component';
import { FEATURE_NAME, reducers } from '../features.state';
import { StatsEffects } from './home/stats/stats-effects.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { TimelineComponent } from './timeline/timeline.component';

@NgModule({
    declarations: [
        HomeComponent,
        StatsComponent,
        StatComponent,
        TimelineComponent
    ],
    imports: [
        SharedModule,
        HomeRoutingModule,
        StoreModule.forFeature(FEATURE_NAME, reducers),
        EffectsModule.forFeature([StatsEffects])
    ]
})
export class HomeModule {}
