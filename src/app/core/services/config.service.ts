import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private config: { domain: string; port: number; protocol: string } = { domain: '', port: 0, protocol: '' };

  constructor(private http: HttpClient) {}

  async load(): Promise<void> {
    const data = await firstValueFrom(
      this.http.get<{ domain: string; port: number; protocol: string }>('/assets/config.json')
    );
    this.config = data;
  }

  get domain(): string {
    return this.config.domain;
  }

  get port(): number {
    return this.config.port;
  }

  get protocol(): string {
    return this.config.protocol;
  }

  get apiUrl(): string {
    //si no hay puerto, se asume que es el puerto 80 para http y 443 para https
    if (!this.port) {
      return `${this.protocol}://${this.domain}`;
    }
    return `${this.protocol}://${this.domain}:${this.port}`;
  }
}