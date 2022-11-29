import { NgxMaskModule } from 'ngx-mask';
import { ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
import { StatisticsComponent } from './statistics.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsRoutingModule } from './statistics-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { NgChartsModule } from 'ng2-charts';
import { DashboardComponent } from '../dashboard/dashboard.component';


@NgModule({
  declarations: [
    StatisticsComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgChartsModule,
    NgxMaskModule
  ]
})
export class StatisticsModule { }
