import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/core/services/request/request.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-request-dialog',
  templateUrl: './request-dialog.component.html',
  styleUrls: ['./request-dialog.component.scss'],
})
export class RequestDialogComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private requestService: RequestService,
    public dialogRef: MatDialogRef<RequestDialogComponent>
  ) {}

  requestForm = this.fb.group({
    produto: ['', [Validators.required]],
    quantidade: ['', [Validators.required]],
    condicaoProduto: ['', [Validators.required]],
    unidadeMedida: ['', [Validators.required]],
  });

  pegarValor() {
    this.requestService.arrayRequest.push(this.requestForm.value);
    this.requestForm.reset();
  }
  ngOnInit(): void {}
}
