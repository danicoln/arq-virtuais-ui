import { Component, Injectable, Injector, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { catchError, switchMap } from "rxjs";
import Swal from "sweetalert2";
import { BaseResourceModel } from "../../models/base-resource.model";
import { BaseResourceService } from "../../services/base-resource.service";
import { MessageComponent } from "../../../components/message/message.component";

@Injectable()
export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit {

    currentAction?: string;
    resourceForm?: FormGroup;
    public resource!: T;
    pageTitle?: string;
    submittingForm: boolean = false;

    protected route?: ActivatedRoute;
    protected router?: Router;
    protected formBuilder?: FormBuilder;
    public serverErrorMessages: string[] = [];
    protected message?: MessageComponent;


    constructor(
        protected injector: Injector,
        protected resourceService: BaseResourceService<T>,
        protected jsonDataToResourceFn: (jsonData: any) => T
    ) {
        this.route = this.injector.get(ActivatedRoute);
        this.router = this.injector.get(Router);
        this.formBuilder = this.injector.get(FormBuilder);
    }

    ngOnInit(): void {
        this.buildResourceForm();
        this.setCurrentAction();
        this.loadResource();
    }

    submitForm() {
        this.submittingForm = true;

        if (this.currentAction == "new") {
            this.createResource();
            this.message?.showMessage("Sucesso", "Recurso criado com sucesso");
        } else {
            this.updateResource();
            this.message?.showMessage("Sucesso", "Recurso atualizado com sucesso");
        }
    }

    protected setCurrentAction() {
        if (this.route?.snapshot.url[0].path == 'new') {
            this.currentAction = 'new'
        } else {
            this.currentAction = 'edit'
        }
    }

    protected loadResource() {
        if (this.currentAction == "edit") {
            this.route?.paramMap.pipe(
                switchMap(params => this.resourceService.getById(+params.get("id")!))
            )
                .subscribe(
                    (resource) => {
                        this.resource = resource;
                        this.resourceForm?.patchValue(resource)
                    },
                    (error) => catchError(error)
                )
        }
    }

    protected createResource() {
        const resource: T = this.jsonDataToResourceFn(this.resourceForm?.value);

        this.resourceService.create(resource)
            .subscribe(
                resource => this.actionsForSuccess(resource),
                error => this.actionsForError(error)
            )
    }

    protected updateResource() {
        const resource: T = this.jsonDataToResourceFn(this.resourceForm?.value);

        this.resourceService.update(resource)
            .subscribe(
                resource => this.actionsForSuccess(resource),
                error => this.actionsForError(error)
            )
    }

    protected actionsForSuccess(resource: T) {
        Swal.fire('Sucesso', 'Recurso processado com sucesso');
        const baseComponentPath: string = this.route?.snapshot?.parent?.url[0].path!;

        this.router?.navigateByUrl(baseComponentPath, { skipLocationChange: true }).then(
            () => this.router?.navigate([baseComponentPath, resource.id, 'edit'])
        )
    }

    protected actionsForError(error: any) {
        Swal.fire('Erro', 'Ocorreu um erro ao processar sua solicitação');
        this.submittingForm = false;

        if (error.status === 422) {
            this.serverErrorMessages = JSON.parse(error._body).errors;
        } else {
            this.serverErrorMessages = ["Falha na comunicação com o servidor. Por favor, tente mais tarde"]
        }
    }

    protected setPageTitle() {
        if (this.currentAction == 'new') {
            this.pageTitle = this.creationPageTitle();
        } else {
            this.pageTitle = this.editionPageTitle();
        }
    }

    protected creationPageTitle(): string {
        return "Novo";
    }

    protected editionPageTitle(): string {
        return "Edição";
    }


    protected abstract buildResourceForm(): void;
}