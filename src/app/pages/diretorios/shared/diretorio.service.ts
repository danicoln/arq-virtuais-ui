import { Injectable, Injector } from '@angular/core';
import { environment } from '../../../environment';
import { BaseResourceService } from '../../../shared/services/base-resource.service';
import { Diretorio } from './diretorio.model';

@Injectable({
  providedIn: 'root'
})
export class DiretorioService extends BaseResourceService<Diretorio> {

  constructor(
    protected override injector: Injector
  ) { 
    super(`${environment.apiBaseUrl}/diretorios`, injector, Diretorio.fromJson)
  }

}
