import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./features/home/home.module').then((m) => m.HomeModule)
    },
    {
        path: '**',
        redirectTo: '/home'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: 'enabled',
            preloadingStrategy: PreloadAllModules
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
