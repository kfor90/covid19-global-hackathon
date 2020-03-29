import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
    StoreRouterConnectingModule,
    RouterStateSerializer
} from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// local
import { CustomSerializer } from './router/custom-serializer';
import { environment } from 'src/environments/environment';
import { reducers } from './core.state';

@NgModule({
    declarations: [],
    imports: [
        // angular
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        HttpClientModule,
        RouterModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production
        }),
        StoreModule.forRoot(reducers),
        StoreRouterConnectingModule.forRoot(),
        environment.production
            ? []
            : StoreDevtoolsModule.instrument({
                  maxAge: 25,
                  name: 'Angular NgRx Material Starter',
                  logOnly: environment.production
              }),
        EffectsModule.forRoot([])
    ],
    providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }],
    exports: []
})
export class CoreModule {}
