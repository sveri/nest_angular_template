import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    // {
    //   path: 'heroes',
    //   component: HeroListComponent,
    //   data: { title: 'Heroes List' }
    // },
    {
        path: '',
        redirectTo: '/',
        pathMatch: 'full'
    },
    // { path: '**', component: PageNotFoundComponent }
];
