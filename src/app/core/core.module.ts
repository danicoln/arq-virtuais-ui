import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { ErrorHandlerService } from "./error-handler.serice";
import { MessageComponent } from "../components/message/message.component";
import { MessageService } from "primeng/api";

@NgModule({
    declarations: [
  
    ],
    imports: [
      RouterModule,
      FormsModule,
      BrowserAnimationsModule,
      ReactiveFormsModule,
      
    ],
  
    exports: [
      RouterModule,
      FormsModule,
      BrowserAnimationsModule,
      ReactiveFormsModule,
    ],
  
    providers: [
        ErrorHandlerService,
        MessageService,
        MessageComponent
    ]
  })
  export class CoreModule { }
  