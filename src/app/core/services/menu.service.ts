import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuModel } from '../../model/menu.model';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private menuChange = new BehaviorSubject<MenuModel[]>([]);
  
  getMenuChange() {
    return this.menuChange.asObservable();
  }

  setMenuChange(menus: MenuModel[]) {
    this.menuChange.next(menus);
  }
}
