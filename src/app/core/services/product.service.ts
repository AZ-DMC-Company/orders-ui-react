import { inject, Injectable } from '@angular/core';
import { ProductModel } from '../../model/product.model';
import { ConfigService } from './config.service';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends GenericService<ProductModel>{

  private configService = inject(ConfigService);
  protected override url: string = `${this.configService.apiUrl}/products`;

}
