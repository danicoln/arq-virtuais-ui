import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: 'diretorios', loadChildren: () => import('./pages/diretorios/diretorios.module').then(m => m.DiretoriosModule) },
    // { path: 'arquivos', loadChildren: () => import('./pages/arquivos/arquivos.module').then(m => m.ArquivosModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
