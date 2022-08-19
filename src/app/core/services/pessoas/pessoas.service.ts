import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/app/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class PessoasService {
  pessoaUrl = `${API_CONFIG.baseUrl.prod}/service/pessoa`;

  constructor(private http: HttpClient) { }

  findByEmail(email: string) {
    return this.http.get(`${this.pessoaUrl}/${email}`);
  }
}
