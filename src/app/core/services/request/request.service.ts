import { HttpClient } from '@angular/common/http';
import { typeArrayRequest, typeListRequest } from './../../models/request';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/app/config/api.config';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  arrayRequest: typeArrayRequest = [];

  requestUrl = `${API_CONFIG.baseUrl.prod}/service/lista-pedidos`;

  constructor(private http: HttpClient) {}

  create(requests: typeListRequest) {
    return this.http.post<typeListRequest>(this.requestUrl, requests);
  }
}
