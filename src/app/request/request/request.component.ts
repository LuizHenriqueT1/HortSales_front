import { HotToastService } from '@ngneat/hot-toast';
import { Request, typeListRequest } from './../../core/models/request';
import { MatDialog } from '@angular/material/dialog';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  OnInit,
} from '@angular/core';
import { RequestDialogComponent } from '../request-dialog/request-dialog/request-dialog.component';
import { RequestService } from 'src/app/core/services/request/request.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestComponent implements OnInit, DoCheck {
  constructor(
    private dialog: MatDialog,
    private requestService: RequestService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private toast: HotToastService
  ) {}

  displayedColumns: string[] = [
    'itens',
    'produto',
    'quantidade',
    'unidadeMedida',
    'condicaoProduto',
    'remover',
  ];

  dataSource = new MatTableDataSource<Request>(
    this.requestService.arrayRequest
  );

  openDialog() {
    this.dialog.open(RequestDialogComponent);
  }

  listaVazia: boolean = true;

  //SE HOUVER MUDANÇA NO ARRAY DO SERVICE, ATUALIZA A TABELA
  ngDoCheck() {
    this.dataSource = new MatTableDataSource<Request>(
      this.requestService.arrayRequest
    );
    if (this.requestService.arrayRequest.length > 0) {
      this.listaVazia = false;
    }
    this.changeDetectorRef.detectChanges();
  }

  removeItem(item: any) {
    this.requestService.arrayRequest.splice(
      this.requestService.arrayRequest.indexOf(item),
      1
    );
    this.dataSource = new MatTableDataSource<Request>(
      this.requestService.arrayRequest
    );
  }

  onClickHome() {
    this.router.navigate(['/']);
  }

  confirmRequest() {
    const requests: typeListRequest = {
      listaPedidos: this.requestService.arrayRequest,
    };

    const ref = this.toast.loading(`Enviando pedido...`);

    this.requestService.create(requests).subscribe({
      next: () => {
        ref.close();
        this.toast.success(`Pedido enviado com sucesso!`);
        this.router.navigate(['/']);
      },
      error: (err) => {
        ref.close();
        switch (err.status) {
          case 400:
            window.navigator?.vibrate(200);
            return this.toast.error(`Preencha os campos corretamente!`);
          case 403:
            window.navigator?.vibrate(200);
            return this.toast.error(
              `Você não tem permissão para realizar essa ação!`
            );
          case 404:
            window.navigator?.vibrate(200);
            return this.toast.error(
              `Não foi possível encontrar o recurso solicitado!`
            );
          case 409:
            window.navigator?.vibrate?.(200);
            return this.toast.error('err.error.message');
          case 500:
            window.navigator?.vibrate(200);
            return this.toast.error(`Erro interno do servidor!`);
          default:
            window.navigator?.vibrate(200);
            return this.toast.error(
              `Um erro aconteceu! ${
                err.error.message ?? 'Verifique sua conexão com a internet'
              }`
            );
        }
      },
    });
  }

  ngOnInit(): void {}
}
