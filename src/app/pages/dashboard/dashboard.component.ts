import { Component, inject, signal, effect } from '@angular/core';
import { LoginService } from '../../core/services/login.service';
import { environment } from '../../../environments/environment';
import { UserModel } from '../../model/user.model';
import { MenuModel } from '../../model/menu.model';
import { MenuService } from '../../core/services/menu.service';

type LoadingState = 'loading' | 'loaded' | 'error';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {

  user = signal<UserModel | null>(null);
  loadingState = signal<LoadingState>('loading');
  errorMessage = signal<string | null>(null);

  private loginService = inject(LoginService);
  private menuService = inject(MenuService);

  menu: MenuModel[] = [
    {
      idMenu: 1,
      icon: 'shopping_cart',
      name: 'Ordenes',
      url: '/pages/order',
      userType: [1, 2]
    },
    {
      idMenu: 2,
      icon: 'inventory',
      name: 'Productos',
      url: '/pages/product',
      userType: [1]
    }
  ];

  constructor() {
    effect(() => {
      // Cuando el usuario se carga, actualiza el menú
      const currentUser = this.user();
      if (currentUser && this.loadingState() === 'loaded') {
        const filteredMenu = this.menu.filter(m => m.userType.includes(currentUser.idUserType));
        this.menuService.setMenuChange(filteredMenu);
      }
    });
  }

  ngOnInit() {
    const userId = sessionStorage.getItem(environment.USER_ID);
    if (!userId) {
      this.loadingState.set('error');
      this.errorMessage.set('No se encontró ID de usuario');
      return;
    }

    this.loginService.showUserInfo(userId).subscribe({
      next: (data) => {
        this.user.set(data);
        this.loadingState.set('loaded');
        this.errorMessage.set(null);
      },
      error: () => {
        this.loadingState.set('error');
        this.errorMessage.set('Error al cargar la información del usuario');
        this.user.set(null);
      }
    });
  }
}
