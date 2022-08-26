import { Observable } from 'rxjs';
import { Component, Inject, OnInit } from '@angular/core';
import { FuncionariosService } from 'src/app/core/services/funcionarios/funcionarios.service';
import { Funcionario } from 'src/app/core/models/pessoa';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-funcionario-details',
  templateUrl: './funcionario-details.component.html',
  styleUrls: ['./funcionario-details.component.scss']
})
export class FuncionarioDetailsComponent implements OnInit {
  funcionario$?: Observable<Funcionario>;

  constructor(
    private funcionariosService: FuncionariosService,
    @Inject(MAT_DIALOG_DATA) private data: Funcionario
  ) { }

  ngOnInit(): void {
    this.funcionario$ = this.funcionariosService.findById(this.data.id!);
  }

}
