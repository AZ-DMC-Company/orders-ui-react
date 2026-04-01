import { Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OrderDetail, OrderModel } from '../../../model/order.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { OrderService } from '../../../core/services/order.service';
import { MatSelectModule } from '@angular/material/select';
import { ClientService } from '../../../core/services/client.service';
import { ClientModel } from '../../../model/client.model';
import { forkJoin, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ProductService } from '../../../core/services/product.service';
import { ProductModel } from '../../../model/product.model';
import { environment } from '../../../../environments/environment.development';

export interface ProductOrderRow {
  idProducto: number;
  productoName: string;
  selected: boolean;
  cantidad: number;
}

@Component({
  selector: 'app-order-dialog',
  standalone: true,
  imports: [
    MaterialModule,
    MatDialogModule,
    MatToolbarModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIcon,
    MatSelectModule,
  ],
  templateUrl: './order-dialog.component.html',
  styleUrl: './order-dialog.component.scss',
})
export class OrderDialogComponent implements OnInit {
  order: OrderModel;
  private isEdit = false;
  protected form: FormGroup;
  clients: ClientModel[];

  productRows: ProductOrderRow[] = [];
  readonly displayedColumns: string[] = ['select', 'idProducto', 'productoName', 'cantidad'];

  private orderService = inject(OrderService);
  private clientService = inject(ClientService);
  private productService = inject(ProductService);
  readonly data = inject<OrderModel | undefined>(MAT_DIALOG_DATA, { optional: true });
  readonly dialogRef = inject(MatDialogRef<OrderDialogComponent>);
  private userId = sessionStorage.getItem(environment.USER_ID);

  ngOnInit(): void {
    this.form = new FormGroup({
      orderId: new FormControl(),
      userId: new FormControl(this.userId),
      clientId: new FormControl(),
    });
    this.order = { ...(this.data ?? {}) } as OrderModel;

    forkJoin({
      clients: this.clientService.findAll(),
      products: this.productService.findAll(),
    })
      .pipe(
        switchMap(({ clients, products }) => {
          this.clients = clients;
          if (
            this.order.idOrder &&
            (!this.order.orderDetail || this.order.orderDetail.length === 0)
          ) {
            return this.orderService.findById(this.order.idOrder).pipe(
              tap((full) => {
                this.order = full;
              }),
              map(() => products)
            );
          }
          return of(products);
        })
      )
      .subscribe((products) => {
        this.buildProductRows(products);
        if (this.order.idOrder) {
          this.isEdit = true;
          this.initForm();
        }
      });
  }

  close() {
    this.dialogRef.close();
  }

  initForm() {
    this.form = new FormGroup({
      orderId: new FormControl(this.order?.idOrder),
      userId: new FormControl(this.order?.user?.idUser),
      clientId: new FormControl(this.order?.client?.idClient),
    });
  }

  onCantidadChange(row: ProductOrderRow, event: Event) {
    const raw = (event.target as HTMLInputElement).value;
    const n = parseInt(raw, 10);
    row.cantidad = Number.isFinite(n) && n > 0 ? n : 1;
  }

  private buildProductRows(products: ProductModel[]) {
    const detailByProductId = new Map(
      (this.order.orderDetail ?? []).map((d) => [d.product.idProduct, d])
    );
    this.productRows = products.map((p) => {
      const d = detailByProductId.get(p.idProduct);
      return {
        idProducto: p.idProduct,
        productoName: p.name,
        selected: !!d,
        cantidad: d?.quantity ?? 1,
      };
    });
  }

  private buildOrderDetails(): OrderDetail[] {
    return this.productRows
      .filter((r) => r.selected && r.cantidad > 0)
      .map(
        (r) =>
          ({
            product: {
              idProduct: r.idProducto,
              name: r.productoName,
            } as ProductModel,
            quantity: r.cantidad,
          }) as OrderDetail
      );
  }

  operate() {
    const orderSave = {
      idOrder: this.form.value['orderId'],
      user: { idUser: this.form.value['userId'] },
      client: { idClient: this.form.value['clientId'] },
      state: '1',
      orderDetail: this.buildOrderDetails(),
    } as OrderModel;
    if (this.isEdit) {
      this.orderService
        .update(this.order.idOrder, orderSave)
        .pipe(
          switchMap(() => this.orderService.findAll()),
          tap((data) => this.orderService.setOrderChange(data)),
          tap(() => this.orderService.setMessageChange('Pedido actualizado correctamente'))
        )
        .subscribe();
    } else {
      this.orderService
        .save(orderSave)
        .pipe(
          switchMap(() => this.orderService.findAll()),
          tap((data) => this.orderService.setOrderChange(data)),
          tap(() => this.orderService.setMessageChange('Pedido creado correctamente'))
        )
        .subscribe();
    }
    this.close();
  }
}
