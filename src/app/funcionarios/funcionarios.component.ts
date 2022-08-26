import { FuncionarioDeleteComponent } from './funcionario-delete/funcionario-delete/funcionario-delete.component';
import { HotToastService } from '@ngneat/hot-toast';
import { FuncionariosService } from './../core/services/funcionarios/funcionarios.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Funcionario } from '../core/models/pessoa';
import { EMPTY, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { FuncionarioDetailsComponent } from './funcionario-details/funcionario-details/funcionario-details.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.scss']
})
export class FuncionariosComponent implements OnInit {

  constructor(
    private funcionariosService: FuncionariosService,
    private toast: HotToastService,
    private dialog: MatDialog,
    private router: Router
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
    'acoes'
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

  onClickDelete(funcionarios: Funcionario) {
    const ref = this.dialog.open(FuncionarioDeleteComponent, {
      width: '400px',
      data: funcionarios
    })
  }

  onClickDetails(funcionario: Funcionario) {
    const ref = this.dialog.open(FuncionarioDetailsComponent, {
      width: '400px',
      data: funcionario
    })
  }


  onClickCreate() {
    this.router.navigate(['create-funcionario']);
  }


  ngOnInit(): void {
    this.funcionarios$ = this.funcionariosService.findAll();
    this.findAll();
  }

}
