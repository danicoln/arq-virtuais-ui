import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";
import { ButtonComponent } from "../components/button/button.component";
import { MessagesModule } from "primeng/messages";
import { ToolbarModule } from "primeng/toolbar";

const COMPONENTS = [
    ButtonComponent
];
const MODULES = [
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    CommonModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    TableModule,
    MessagesModule,
    ToolbarModule
];

@NgModule({
    declarations: [
        COMPONENTS
    ],
    imports: [
        MODULES,
    ],
    exports: [
        COMPONENTS,
        MODULES,
    ]
})
export class SharedModule {}