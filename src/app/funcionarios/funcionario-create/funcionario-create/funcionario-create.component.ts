import { FuncionariosService } from './../../../core/services/funcionarios/funcionarios.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Funcionario } from './../../../core/models/pessoa';
import { DatepickerComponent } from './../datepicker/datepicker.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { someTrue, trueIndexes } from 'src/app/shared/utils';
import { Router } from '@angular/router';


@Component({
  selector: 'app-funcionario-create',
  templateUrl: './funcionario-create.component.html',
  styleUrls: ['./funcionario-create.component.scss']
})
export class FuncionarioCreateComponent implements OnInit {

  exampleHeader = DatepickerComponent;

  funcionarioForm = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(8)]],
    cpf: ['', [Validators.required, Validators.minLength(11) ]],
    dataNascimento: ['', [Validators.required,]],
    telefone: ['', [Validators.required, Validators.maxLength(11)]],
    endereco: ['', [Validators.required]],
    perfils: this.fb.array([[false], [true]], [someTrue])
  });
  constructor(
    private fb: FormBuilder,
    private toast: HotToastService,
    private funcionariosService: FuncionariosService,
    private router: Router
  ) { }


  ngOnInit(): void {
  }


  onSubmit() {
    const funcionario: Funcionario = {
      ...this.funcionarioForm.value,
      perfils: trueIndexes(this.funcionarioForm.value.perfils)

    };

    const ref = this. toast.loading(`Adicionando funcionario ${funcionario.nome} ...`);

    this.funcionariosService.create(funcionario).subscribe({
      next: () => {
        ref.close();
        this.toast.success(`Funcionario ${funcionario.nome} adicionado com sucesso!`);
        this.router.navigate(['/funcionarios']);
      },
      error: (err) => {
        ref.close();
        switch (err.status) {
          case 400:
            window.navigator?.vibrate?.(200);
            return this.toast.error('Preencha os campos corretamente!');
          case 403:
          window.navigator?.vibrate?.(200);
            return this.toast.error('Você não tem permissão para adicionar um funcionario!');
          case 409:
            window.navigator?.vibrate?.(200);
            return this.toast.error('err.error.message');
          case 500:
            window.navigator?.vibrate?.(200);
            return this.toast.error('Erro interno do servidor! tente novamente mais tarde!');
          default:
            window.navigator?.vibrate?.(200);
            return this.toast.error(`Um erro aconteceu! ${err.error.message ?? 'Verifique sua conexão com a internet'}`
            );
        }
      }
    })
  }

}
