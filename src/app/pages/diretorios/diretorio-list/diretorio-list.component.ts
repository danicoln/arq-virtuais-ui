import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageComponent } from '../../../components/message/message.component';
import { ErrorHandlerService } from '../../../core/error-handler.serice';
import { Diretorio } from '../shared/diretorio.model';
import { DiretorioService } from '../shared/diretorio.service';

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
  itensSelecionados!: Diretorio[] | null;

  constructor(
    private error: ErrorHandlerService,
    private diretorioService: DiretorioService,
    private message: MessageComponent,
    private router: Router
  ) { }

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

    this.router.navigate([`/diretorios/${diretorio.id}/edit`]);
  }

  deletar(obj: Diretorio) {
    return new Promise((resolve, reject) => {
      this.message.showConfirmation(
        'Excluir diretório?',
        'Esta ação excluirá o diretório permanentemente'
      ).then((confirmado) => {
        if (confirmado) {
          this.diretorioService.delete(obj.id!)
            .subscribe(() => {
              this.diretorios = this.diretorios.filter((value) => value.id !== obj.id);
              this.diretorio = {};
              this.message.showMessage('Info', 'Item excluído');
              resolve(true);
            })
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
          const promises = (this.itensSelecionados || []).map(diretorio => 
            new Promise<void>((resolve, reject) => {
              this.diretorioService.delete(diretorio.id!).subscribe({
                next: (resposta) => {
                  // console.log('Item deletado:', diretorio.id, resposta);
                  this.diretorios = this.diretorios.filter(d => d.id !== diretorio.id);
                  resolve(); 
                },
                error: (err) => {
                  reject(err); 
                  this.handleError(err);
                }
              });
            })
          );
          await Promise.all(promises); 
  
          this.message.showMessage('Info', 'Itens excluídos com sucesso');
          this.itensSelecionados = [];
        } catch (error) {
          this.handleError(error);
        }
      }
    });
  }

  listar() {
    this.diretorioService.listarResources()
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
    this.router.navigate(['/diretorios/new']);
  }

  private handleError(erro: any): void {
    this.error.handle(erro);
    this.message.showError('Erro!', 'Ocorreu um erro. Por favor, tente novamente');
  }
}
