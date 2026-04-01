import { Routes } from '@angular/router';
import { OrderComponent } from './order/order.component';
import { ProductComponent } from './product/product.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const pagesRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'order', component: OrderComponent },
    { path: 'product', component: ProductComponent },
];