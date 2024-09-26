import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { ErrorHandlerService } from "./error-handler.serice";
import { MessageComponent } from "../components/message/message.component";
import { MessageService } from "primeng/api";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { FooterComponent } from "../shared/components/footer/footer.component";
import { HeaderComponent } from "../shared/components/header/header.component";
import { ButtonModule } from "primeng/button";

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    RouterModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    CommonModule,

    ButtonModule

  ],

  exports: [
    RouterModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    CommonModule,
    HeaderComponent,
    FooterComponent
  ],

  providers: [
    ErrorHandlerService,
    MessageService,
    MessageComponent
  ]
})
export class CoreModule { }
