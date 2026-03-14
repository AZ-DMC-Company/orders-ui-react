import { Component, OnInit } from '@angular/core';
import { Order } from './order.model';
import { OrderService } from './order.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orders = this.orderService.getOrders();
  }
}