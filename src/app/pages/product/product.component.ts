import { Component, OnInit, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ProductService } from '../../core/services/product.service';
import { ProductModel } from '../../model/product.model';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-product',
  imports: [MatCardModule, SlicePipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  standalone: true,
})
export class ProductComponent implements OnInit {
  private productService = inject(ProductService);
  readonly products = signal<ProductModel[]>([]);

  ngOnInit(): void {
    this.productService.findAll().subscribe((data) => {
      this.products.set(data);
    });
  }
}
