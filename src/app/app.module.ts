import { FuncionariosModule } from './funcionarios/funcionarios.module';
import { HotToastModule } from '@ngneat/hot-toast';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { interceptors } from './core/interceptors/auth/auth.interceptor';

@NgModule({
  declarations: [	
    AppComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    AuthModule,
    FuncionariosModule,
    HttpClientModule,
    HotToastModule.forRoot(),
  ],
  providers: [interceptors],
  bootstrap: [AppComponent]
})
export class AppModule { }
