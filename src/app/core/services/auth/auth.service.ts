import { PessoasService } from './../pessoas/pessoas.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { API_CONFIG } from 'src/app/config/api.config';
import { retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private pessoasService: PessoasService) {}

  emailUser?: string;
  roleUser?: string;

  login(email: string, senha: string) {
    const creds = { email, senha };
    return this.http.post(`${API_CONFIG.baseUrl.prod}/login`, creds, {
      responseType: 'text',
      observe: 'response',
    });
  }

  userInfo() {
    let token = localStorage.getItem('token');

    if (token !== null) {
      const decoded = this.jwt.decodeToken(token);
      this.emailUser = decoded.sub;
    }

    return this.pessoasService.findByEmail(this.emailUser!).pipe(retry(5));
  }

  jwt = new JwtHelperService();

  get isAuthenticated(): boolean {
    let token = localStorage.getItem('token');

    if (token !== null) {
      const decoded = this.jwt.decodeToken(token);
      this.emailUser = decoded.sub;
      return !this.jwt.isTokenExpired(token);
    }

    return false;
  }

  getTokenExpirationDate() {
    let token = localStorage.getItem('token');

    if (token !== null){
      return this.jwt.getTokenExpirationDate(token);
    }

    return null;
    
  }

  onLogin(token: string) {
    localStorage.setItem('token', token);
  }

  onLogout() {
    localStorage.clear();
  }
}
