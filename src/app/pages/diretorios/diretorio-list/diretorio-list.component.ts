import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DiretorioService } from '../shared/diretorio.service';
import { Diretorio } from '../shared/diretorio.model';
import { MessageComponent } from '../../../components/message/message.component';
import { ErrorHandlerService } from '../../../core/error-handler.serice';

@Component({
  selector: 'app-diretorio-list',
  templateUrl: './diretorio-list.component.html',
  styleUrl: './diretorio-list.component.css'
})
export class DiretorioListComponent implements OnInit {

  @ViewChild('tabela') tabela!: any;

  @Output() selectItem = new EventEmitter<any>();

  diretorios!: Diretorio[];
  diretorio?: Diretorio;
  itensSelecionados!: Diretorio[] |null;

  constructor(
    private error: ErrorHandlerService,
    private diretorioService: DiretorioService,
    private message: MessageComponent,
  ){}

  ngOnInit(): void {
    this.listar();
    console.log(this.diretorios);
  }

  applyFilterGlobal(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (this.tabela && value) {
      this.tabela.filterGlobal(value, 'contains');
    }
  }

  editar(diretorio: Diretorio) {

    this.diretorio = { ...diretorio };
    // this.itemDialog = true;

  }

  deletar(obj: Diretorio) {
    return new Promise((resolve, reject) => {
      this.message.showConfirmation(
        'Excluir diretório?',
        'Esta ação excluirá o diretório permanentemente'
      ).then((confirmado) => {
        if (confirmado) {
          this.diretorioService.excluir(obj.id!)
          .then(() =>{
            this.diretorios = this.diretorios.filter((value) => value.id !== obj.id);
            this.diretorio = {};
            this.message.showMessage('Info', 'Item excluído');
            resolve(true);
          })
          .catch((error: any) => {
            this.handleError(error);
            reject(error);
          });
        } else {
          resolve(false);
        }
      })
      .catch((error) => {
        this.handleError(error);
        reject(error);
      });
    });
  }

  deletarItensSelecionados() {
    this.message.showConfirmation(
      'Excluir itens selecionados?',
      'Esta ação excluirá os itens selecionados permanentemente'
    ).then(async (confirmado) => {
      if (confirmado) {
        try {
          for (const diretorio of this.itensSelecionados || []) {
            await this.diretorioService.excluir(diretorio.id!);
          }
          this.diretorios = this.diretorios.filter((value) => !this.itensSelecionados?.includes(value));
          this.diretorios = [...this.diretorios];
          this.listar();
          this.message.showMessage('Info', 'Itens excluídos com sucesso');
        } catch (error) {
          this.handleError(error);
        }
      }
    })
  }

  listar() {
    this.diretorioService.listarDiretorios()
    .subscribe(
      (diretorios: Diretorio[]) => {
        this.diretorios = diretorios
      },
      erro => {
        this.error.handle(erro);
      }
    );
  }

  abrirFormulario() {
    const item = this.diretorio;
    this.selectItem.emit(item);
  }

  private handleError(erro: any): void {
    this.error.handle(erro);
    this.message.showError('Erro!', 'Ocorreu um erro. Por favor, tente novamente');
  }
}
