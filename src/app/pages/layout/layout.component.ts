import { Component, inject } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { MenuModel } from '../../model/menu.model';
import { LoginService } from '../../core/services/login.service';
import { MenuService } from '../../core/services/menu.service';

@Component({
  selector: 'app-layout',
  imports: [
    MatMenuModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatDividerModule,
    MatToolbarModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  menus: MenuModel[];

  private menuService = inject(MenuService);
  private loginService = inject(LoginService);

  ngOnInit(): void {
    this.menuService.getMenuChange().subscribe(data => this.menus = data );
  }

  logout(){
    this.loginService.logout().subscribe();
  }
}
