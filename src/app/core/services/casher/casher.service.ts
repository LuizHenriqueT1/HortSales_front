import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/app/config/api.config';
import { Casher } from '../../models/casher';
import { MesEAno } from '../../models/mesEAno';

@Injectable({
  providedIn: 'root'
})
export class CasherService {
  casherUrl = `${API_CONFIG.baseUrl.prod}/service/casher`

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  findAll(): Observable<Casher[]> {
    return this.http.get<Casher[]>(this.casherUrl);
  }

  create(casher: Casher) {
    return this.http.post<Casher>(this.casherUrl, casher);
  }

  ///service/casher/media-de-lucro?mes=9&ano=2022
  ///service/casher/lucro?mes=9&ano=2022
  findMediaLucro(mes: number, ano: number): Observable<MesEAno> {
    return this.http.get<MesEAno>(`${this.casherUrl}/media-de-lucro?mes=${mes}&ano=${ano}`);
  }

  findSomaLucroMes(mes: number, ano: number): Observable<MesEAno> {
    return this.http.get<MesEAno>(`${this.casherUrl}/lucro?mes=${mes}&ano=${ano}`);
  }

  findVendasUltimosSeteDias(): Observable<number> {
    return this.http.get<number>(`${this.casherUrl}/lucros-semana`);
  }

  findVendasUltimosTrintaDias(): Observable<number> {
    return this.http.get<number>(`${this.casherUrl}/lucros-ultimo-mes`);
  }

  findMediaDiariaMesAnterior(): Observable<number> {
    return this.http.get<number>(`${this.casherUrl}/media-diaria-mes-anterior`);
  }

  findVendasUltimosDozeMeses(): Observable<number> {
    return this.http.get<number>(`${this.casherUrl}/faturamentos-ultimos-doze-meses`)
  }
}
