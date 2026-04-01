import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../core/services/login.service';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule, 
    ReactiveFormsModule, 
    FormsModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  username: string;
  password: string;

  private loginService = inject(LoginService);
  private router = inject(Router);
  login() {
    this.loginService.login(this.username, this.password).subscribe(
      data => {
        sessionStorage.setItem(environment.TOKEN_NAME, data.access_token);
        sessionStorage.setItem(environment.USER_ID, data.user_id);
        this.router.navigate(['/pages/dashboard']);
      }
    );
  }
}
