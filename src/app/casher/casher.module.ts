import { CasherComponent } from './casher.component';
import { CoreModule } from './../core/core.module';
import { MaterialModule } from '../shared/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CasherRoutingModule } from './casher-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    CasherComponent
  ],
  imports: [
    CommonModule,
    CasherRoutingModule,
    MaterialModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ]
})
export class CasherModule { }
