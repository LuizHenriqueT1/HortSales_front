import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Funcionario } from 'src/app/core/models/pessoa';
import { FuncionariosService } from 'src/app/core/services/funcionarios/funcionarios.service';
import { profileChecked, someTrue, trueIndexes } from 'src/app/shared/utils';

@Component({
  selector: 'app-funcionario-update',
  templateUrl: './funcionario-update.component.html',
  styleUrls: ['./funcionario-update.component.scss'],
})
export class FuncionarioUpdateComponent implements OnInit {
  hide = true;
  errorMsg = '';
  loading = true;
  error = false;

  funcionarioForm = this.fb.group({
    id: [null],
    nome: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    senha: [null, [Validators.required, Validators.minLength(8)]],
    cpf: ['', [Validators.required, Validators.minLength(11)]],
    dataNascimento: ['11', [Validators.required]],
    telefone: ['', [Validators.required, Validators.maxLength(11)]],
    endereco: ['', [Validators.required]],
    perfils: this.fb.array([[false], [false]], [someTrue]),
  });

  constructor(
    private fb: FormBuilder,
    private toast: HotToastService,
    private funcionariosService: FuncionariosService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onSubmit() {
    const funcionario: Funcionario = {
      ...this.funcionarioForm.value,
      perfils: trueIndexes(this.funcionarioForm.value.perfils),
    };

    const ref = this.toast.loading(
      `Atualizando funcionario ${funcionario.nome} ...`
    );

    this.funcionariosService.update(funcionario).subscribe({
      next: () => {
        ref.close();
        this.toast.success(
          `Funcionario ${funcionario.nome} Atualizado com sucesso!`
        );
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
            return this.toast.error(
              'Você não tem permissão para adicionar um funcionario!'
            );
          case 409:
            window.navigator?.vibrate?.(200);
            return this.toast.error('err.error.message');
          case 500:
            window.navigator?.vibrate?.(200);
            return this.toast.error(
              'Erro interno do servidor! tente novamente mais tarde!'
            );
          default:
            window.navigator?.vibrate?.(200);
            return this.toast.error(
              `Um erro aconteceu! ${
                err.error.message ?? 'Verifique sua conexão com a internet'
              }`
            );
        }
      },
    });
  }
  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.funcionariosService.findById(id).subscribe({
      next: (funcionario) => {
        funcionario.senha = '';
        const perfils = profileChecked(funcionario.perfils as string[]);
        this.funcionarioForm.patchValue(funcionario);
        this.funcionarioForm.get('perfils')?.setValue(perfils);
        this.loading = false;
      },
      error: (err) => {
        this.errorMsg = err.error.message;
        if (!this.errorMsg) this.errorMsg = 'Um erro aconteceu';
        this.error = true;
        this.loading = false;
      },
    });
  }
  onClickList() {
    this.router.navigate(['/funcionarios']);
  }
}
