import { Injectable } from '@angular/core';
import { Order } from './order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: Order[] = [
    { id: 1, name: 'Producto A', quantity: 5 },
    { id: 2, name: 'Producto B', quantity: 3 }
  ];

  getOrders(): Order[] {
    return this.orders;
  }
}