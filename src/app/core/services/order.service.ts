import { inject, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { OrderModel } from '../../model/order.model';
import { Subject } from 'rxjs';
import { ConfigService } from './config.service';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends GenericService<OrderModel>{

  private configService = inject(ConfigService);
  protected override url: string = `${this.configService.apiUrl}/orders`;
  private orderChange: Subject<OrderModel[]> = new Subject<OrderModel[]>;
  private messageChange: Subject<string> = new Subject<string>();

  setOrderChange(orders: OrderModel[]) {
    this.orderChange.next(orders);
  }

  getOrderChange() {
    return this.orderChange.asObservable();
  }

  setMessageChange(message: string) {
    this.messageChange.next(message);
  }

  getMessageChange() {
    return this.messageChange.asObservable();
  }
  
}
