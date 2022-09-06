import { SharedModule } from './../shared/shared.module';
import { FuncionariosComponent } from './funcionarios.component';
import { FuncionariosRoutingModule } from './funcionarios-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { FuncionarioCreateComponent } from './funcionario-create/funcionario-create/funcionario-create.component';
import { FuncionarioDeleteComponent } from './funcionario-delete/funcionario-delete/funcionario-delete.component';
import { FuncionarioUpdateComponent } from './funcionario-update/funcionario-update/funcionario-update.component';
import { FuncionarioDetailsComponent } from './funcionario-details/funcionario-details/funcionario-details.component';
import { DatepickerComponent } from './funcionario-create/datepicker/datepicker.component';
import { NgxMaskModule } from 'ngx-mask';




@NgModule({
  declarations: [
    FuncionariosComponent,
    FuncionarioCreateComponent,
    FuncionarioDeleteComponent,
    FuncionarioUpdateComponent,
    FuncionarioDetailsComponent,
    DatepickerComponent
  ],
  imports: [
    CommonModule,
    FuncionariosRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule,
    NgxMaskModule.forRoot()
  ]
})
export class FuncionariosModule { }
