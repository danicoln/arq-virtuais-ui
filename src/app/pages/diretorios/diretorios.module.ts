import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiretoriosRoutingModule } from './diretorios-routing.module';
import { DiretorioFormComponent } from './diretorio-form/diretorio-form.component';
import { DiretorioListComponent } from './diretorio-list/diretorio-list.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    DiretorioFormComponent,
    DiretorioListComponent
  ],
  imports: [
    CommonModule,
    DiretoriosRoutingModule,
    SharedModule
  ],
  exports: [
    DiretorioFormComponent,
    DiretorioListComponent
  ]
})
export class DiretoriosModule { }
