import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { TimelineComponent } from './timeline/timeline.component';

@NgModule({
    declarations: [HomeComponent, TimelineComponent],
    imports: [HomeRoutingModule]
})
export class HomeModule {}
