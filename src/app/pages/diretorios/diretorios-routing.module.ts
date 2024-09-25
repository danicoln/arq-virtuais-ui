import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiretorioListComponent } from './diretorio-list/diretorio-list.component';
import { DiretorioFormComponent } from './diretorio-form/diretorio-form.component';

const routes: Routes = [
  {path: '', component: DiretorioListComponent},
  {path: 'new', component: DiretorioFormComponent},
  {path: ':id/edit', component: DiretorioFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiretoriosRoutingModule { }
