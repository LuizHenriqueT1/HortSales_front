import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/app/config/api.config';
import { Casher } from '../../models/casher';

@Injectable({
  providedIn: 'root'
})
export class CasherService {
  casherUrl = `${API_CONFIG.baseUrl.prod}/service/casher`

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<Casher[]> {
    return this.http.get<Casher[]>(this.casherUrl);
  }

  create(casher: Casher) {
    return this.http.post<Casher>(this.casherUrl, casher);
  }
}
