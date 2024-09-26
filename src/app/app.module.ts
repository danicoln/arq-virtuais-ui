import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { DiretoriosModule } from './pages/diretorios/diretorios.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    CoreModule,
    DiretoriosModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
