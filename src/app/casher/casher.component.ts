import { Router } from '@angular/router';
import { Casher } from './../core/models/casher';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { CasherService } from '../core/services/casher/casher.service';

@Component({
  selector: 'app-casher',
  templateUrl: './casher.component.html',
  styleUrls: ['./casher.component.scss'],
})
export class CasherComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private casherService: CasherService,
    private toast: HotToastService,
    private router: Router
  ) {}

  formCasher = this.fb.group({
    valorInicial: ['', [Validators.required]],
    valorFinal: ['', [Validators.required]],
  });

  showLucro: number = 0;

  onSubmit() {
    const resultLucro =
      this.showLucro = this.formCasher.value.valorFinal - this.formCasher.value.valorInicial;

    const casher: Casher = {
      lucroDia: resultLucro,
      dataDoValor: new Date().toLocaleDateString(),
    };

    const ref = this.toast.loading(`Calculando lucro do dia...`);

    this.casherService.create(casher).subscribe({
      next: () => {
        ref.close();
        this.toast.success('Valor adicionado com sucesso!');
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
              'Você não tem permissão para calcular o lucro do dia!'
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
  onClickHome() {
    this.router.navigate(['/']);
  }

  showValue(value: any) {
    let showValue = value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});;
    return showValue;
  }

  ngOnInit(): void {}
}
