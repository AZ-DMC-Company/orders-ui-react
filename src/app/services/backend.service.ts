import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private baseUrl = '/api'; // Proxy configurado en angular.json para apuntar al backend

  constructor(private http: HttpClient) {}

  test() {
    return this.http.get(`${this.baseUrl}/test`);
  }
}