import { LoaderComponent } from './loader/loader/loader.component';
import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    LoaderComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    LoaderComponent
  ]
})
export class SharedModule { }
