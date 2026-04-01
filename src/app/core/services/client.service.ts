import { inject, Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { GenericService } from './generic.service';
import { ClientModel } from '../../model/client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService extends GenericService<ClientModel>{

  private configService = inject(ConfigService);
  protected override url: string = `${this.configService.apiUrl}/clients`;
}
