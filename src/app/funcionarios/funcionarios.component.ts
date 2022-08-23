import { HotToastService } from '@ngneat/hot-toast';
import { FuncionariosService } from './../core/services/funcionarios/funcionarios.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Funcionario } from '../core/models/pessoa';
import { EMPTY, Observable } from 'rxjs';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.scss']
})
export class FuncionariosComponent implements OnInit {

  constructor(
    private funcionariosService: FuncionariosService,
    private toast: HotToastService,

  ) { }

  funcionarios$: Observable<Funcionario[]> = EMPTY;
  dataSources = new MatTableDataSource<Funcionario>();
  isLoading = true;

  displayedColumns: string[] = [
    'id',
    'nome',
    'email',
    'cpf',
    'dataCriacao',
    'telefone',
    'perfils',
  ]

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSources.filter = filterValue.trim().toLowerCase();
  }

  findAll() {
    this.funcionariosService.findAll().subscribe((resp) => {

      this.dataSources.data = resp;
    });
  }

  ngOnInit(): void {
    this.funcionarios$ = this.funcionariosService.findAll();
    this.findAll();
  }

}
