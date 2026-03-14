// src/app/services/orders.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Order {
  id: number;
  name: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  // URL de tu backend Spring Boot
  private backendUrl = 'https://orders-backend-dev-01.gentleglacier-13b71ce3.eastus.azurecontainerapps.io/orders';

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.backendUrl);
  }
}