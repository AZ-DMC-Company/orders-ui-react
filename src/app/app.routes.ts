import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { pagesRoutes } from './pages/pages.routes';
import { LayoutComponent } from './pages/layout/layout.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent},
    { path: 'pages', component: LayoutComponent, children: pagesRoutes},
];
