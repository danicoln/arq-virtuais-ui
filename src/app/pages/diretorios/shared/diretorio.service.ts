import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom, from, Observable } from 'rxjs';
import { Diretorio } from './diretorio.model';

@Injectable({
  providedIn: 'root'
})
export class DiretorioService {

  chave: string = '';

  private apiUrl = `${environment.apiBaseUrl}/diretorios`;

  constructor(private http: HttpClient) { }

  listarDiretorios(): Observable<Diretorio[]> {
    const headers = new HttpHeaders().set('Authorization', this.chave);
    return from(this.http.get<Diretorio[]>(this.apiUrl, { headers }));
  }

  excluir(codigo: number): Promise<void> {
    const headers = new HttpHeaders().set('Authorization', this.chave);
    return firstValueFrom(this.http.delete<void>(`${this.apiUrl}/${codigo}`, { headers }));
  }
}
