import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseResourceFormComponent } from '../../../shared/components/base-resource-form/base-resource-form.component';
import { Diretorio } from '../shared/diretorio.model';
import { DiretorioService } from '../shared/diretorio.service';

@Component({
  selector: 'app-diretorio-form',
  templateUrl: './diretorio-form.component.html',
  styleUrl: './diretorio-form.component.css'
})
export class DiretorioFormComponent extends BaseResourceFormComponent<Diretorio> implements OnInit {

  override resource: Diretorio = new Diretorio();
  disabled: boolean = false;

  constructor(
    protected diretorioService: DiretorioService,
    protected override injector: Injector
  ) {
    super(injector, diretorioService, Diretorio.fromJson)
  }

  override ngOnInit(): void {

    this.buildResourceForm();

    this.route?.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.diretorioService.getById(id).subscribe(
          (resource: Diretorio) => {
            this.resourceForm?.patchValue({
              id: resource.id,
              nome: resource.nome
            });
            this.resourceForm?.disable();
          },
          error => {
            console.error('Erro ao buscar dados do diretório', error);
          }
        );
      }
      this.resourceForm?.disable();
    });

    super.ngOnInit();
  }

  protected override buildResourceForm(): void {
    this.resourceForm = this.formBuilder?.group({
      id: [null],
      nome: [null, [Validators.required]],
      subDiretorios: this.formBuilder.array([])
    });
  }

  override submitForm(): void {
    if (this.resourceForm?.valid) {
      const diretorioData = this.resourceForm.value;

      if (diretorioData.id) {
        this.diretorioService.update(diretorioData).subscribe(
          response => {
            this.actionsForSuccess(response);
            this.router?.navigate(['/diretorios']);
          },
          error => {
            this.actionsForError(error);
            console.error('Erro ao atualizar o diretório', error);
          }
        );
        this.disabled = true;
        this.resourceForm?.disable();
      } else {
        this.diretorioService.create(diretorioData).subscribe(
          response => {
            this.actionsForSuccess(response);
            this.router?.navigate(['/diretorios']);
          },
          error => {
            this.actionsForError(error);
            console.error('Erro ao salvar o diretório', error);
          }
        );
        this.disabled = true;
        this.resourceForm?.disable();
      }
    }
  }

  onCancelar() {
    this.router?.navigate(['/diretorios']);
  }

  editar() {
    this.disabled = true;
    this.resourceForm?.enable();
  }


  protected override creationPageTitle(): string {
    return "Novo Diretório";
  }

  protected override editionPageTitle(): string {
    const diretorioNome = this.resource.nome || "";
    return "Editando diretório: " + diretorioNome;
  }
}
