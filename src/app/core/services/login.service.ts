import { inject, Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserModel } from '../../model/user.model';

interface ILoginRequest {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private configService = inject(ConfigService);
  private url: string = `${this.configService.apiUrl}/login`;

  private http = inject(HttpClient);
  private router = inject(Router);

  login(username: string, password: string) {
    const body: ILoginRequest = { username, password };

    return this.http.post<any>(this.url, body);
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['login']);
    return this.http.get(`${this.configService.apiUrl}/auth/logout`);
  }

  showUserInfo(userId: string){
    return this.http.get<UserModel>(`${this.configService.apiUrl}/users/${userId}`);
  }
}
