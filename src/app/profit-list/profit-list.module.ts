import { SharedModule } from './../shared/shared.module';
import { MaterialModule } from './../shared/material.module';
import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfitListRoutingModule } from './profit-list-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfitListComponent } from './profit-list.component';


@NgModule({
  declarations: [
    ProfitListComponent,
  ],
  imports: [
    CommonModule,
    ProfitListRoutingModule,
    CoreModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ProfitListModule { }
