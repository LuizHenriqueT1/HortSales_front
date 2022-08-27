import { Funcionario } from './../../models/pessoa';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/app/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class FuncionariosService {
  funcionariosUrl = `${API_CONFIG.baseUrl.prod}/service/funcionarios`

  constructor(private http: HttpClient) { }

  findAll(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.funcionariosUrl);
  }

  findById(id: number): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${this.funcionariosUrl}/${id}`);
  }

  create(funcionario: Funcionario) {
    return this.http.post<Funcionario>(this.funcionariosUrl, funcionario);
  }

  update(funcionario: Funcionario) {
    return this.http.put<Funcionario>(`${this.funcionariosUrl}/${funcionario.id}`, funcionario);
  }

  delete(id: any) {
    return this.http.delete(`${this.funcionariosUrl}/${id}`);
  }
}
