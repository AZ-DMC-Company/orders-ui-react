import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cors-test',
  template: `
    <h2>Test CORS</h2>
    <button (click)="testCors()">Test Login POST</button>
    <pre>{{ result | json }}</pre>
  `,
  standalone: true,               // <-- muy importante
  imports: []
})
export class CorsTestComponent {
  private http = inject(HttpClient);
  result: any;

  testCors() {
    const body = { username: 'testuser', password: 'testpass' };
    this.http.post('https://orders-backend-dev-01.yellowmeadow-33984d9c.westus2.azurecontainerapps.io/login', body, { observe: 'response' })
      .subscribe({
        next: res => this.result = {
          status: res.status,
          headers: res.headers.keys().reduce((acc, key) => ({ ...acc, [key]: res.headers.get(key) }), {}),
          body: res.body
        },
        error: err => this.result = err
      });
  }
} 