import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';

// local
import { environment } from 'src/environments/environment';

@NgModule({
    declarations: [],
    imports: [
        // angular
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production
        })
    ],
    exports: []
})
export class CoreModule {}
