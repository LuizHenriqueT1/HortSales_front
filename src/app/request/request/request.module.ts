import { RequestDialogComponent } from './../request-dialog/request-dialog/request-dialog.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { RequestComponent } from './request.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestRoutingModule } from './request-routing.module';
import { ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [RequestComponent, RequestDialogComponent],
  imports: [
    CommonModule,
    RequestRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class RequestModule {}
