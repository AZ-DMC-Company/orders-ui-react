import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common'; // <-- importar JsonPipe
import { ConfigService } from './config.service';

@Component({
  selector: 'app-cors-test',
  template: `
    <h2>Test CORS</h2>
    <button (click)="testCors()">Test Login POST</button>
    <pre>{{ result | json }}</pre>
  `,
  standalone: true,
  imports: [JsonPipe] // <-- agregar JsonPipe aquí
})
export class CorsTestComponent {
  private http = inject(HttpClient);
  private configService = inject(ConfigService);
  result: any;

  testCors() {
    const body = { username: 'rvera', password: '12345678' };
    const url = `${this.configService.apiUrl}/login`;

    this.http.post(
      url,
      body,
      { observe: 'response' }
    ).subscribe({
      next: res => this.result = {
        status: res.status,
        headers: res.headers.keys().reduce((acc, key) => ({ ...acc, [key]: res.headers.get(key) }), {}),
        body: res.body
      },
      error: err => this.result = err
    });
  }
}