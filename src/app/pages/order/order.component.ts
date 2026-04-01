import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { OrderModel } from '../../model/order.model';
import { OrderService } from '../../core/services/order.service';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardTitleGroup } from '@angular/material/card';
import { SlicePipe, DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { OrderDialogComponent } from './order-dialog/order-dialog.component';

@Component({
  selector: 'app-order',
  imports: [
    MaterialModule,
    RouterOutlet,
    MatCard,
    MatCardHeader,
    MatCardTitleGroup,
    MatCardTitle,
    MatCardSubtitle,
    SlicePipe,
    DatePipe
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
  standalone: true,
})
export class OrderComponent {
  private orderService = inject(OrderService);
  readonly orders = signal<OrderModel[]>([]);
  private _snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog)

  ngOnInit(): void {
    this.orderService.findAll().subscribe((data) => {
      this.orders.set(data);
    });
    this.orderService.getOrderChange().subscribe((data) => {
      this.orders.set(data);
    });
    this.orderService.getMessageChange().subscribe((data) => {
      this._snackBar.open(data, 'Cerrar', {
        duration: 3000
      });
    });
  }

  eliminar(id: number) {
    this.orderService.delete(id).pipe(
        switchMap(() => this.orderService.findAll()),
        tap((data) => this.orderService.setOrderChange(data)),
        tap(() => this.orderService.setMessageChange('Pedido eliminado correctamente'))
      ).subscribe();
  }

  openDialog(order?: OrderModel){
    this.dialog.open(OrderDialogComponent, {
      width: '750px',
      data: order
    })
  }
}
