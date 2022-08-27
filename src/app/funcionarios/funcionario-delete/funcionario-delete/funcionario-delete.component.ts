import { FuncionariosService } from './../../../core/services/funcionarios/funcionarios.service';
import { Funcionario } from './../../../core/models/pessoa';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-funcionario-delete',
  templateUrl: './funcionario-delete.component.html',
  styleUrls: ['./funcionario-delete.component.scss']
})
export class FuncionarioDeleteComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public funcionario: Funcionario,
    private funcionariosService: FuncionariosService,
    private ref: MatDialogRef<FuncionarioDeleteComponent>,
    private route: ActivatedRoute,
    private toast: HotToastService
  ) { }

  funcionario$?: Observable<Funcionario>;

  ngOnInit(): void {
  }
 
  closeDialog() {
    this.ref.close();
  }
  
  delete() {
    this.funcionariosService.delete(this.funcionario.id).subscribe({
      next: () => {
        this.toast.success(`Funcionario ${this.funcionario.nome} deletado com sucesso!`);
        this.ref.close();
        location.reload();
      },
      error: (err) => {
        this.toast.error(`Erro ao deletar funcionario ${this.funcionario.nome}`);
      }
  });
}


}
