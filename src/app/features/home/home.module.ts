import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { StatsComponent } from './home/stats/stats.component';
import { StatComponent } from './home/stats/stat/stat.component';

@NgModule({
    declarations: [HomeComponent, StatsComponent, StatComponent],
    imports: [HomeRoutingModule]
})
export class HomeModule {}
