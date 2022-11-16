import { RequestModule } from './request/request/request.module';
import { StatisticsModule } from './statistics/statistics/statistics.module';
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
import { CasherModule } from './casher/casher.module';
import { ProfitListModule } from './profit-list/profit-list.module';
import { AuthService } from './core/services/auth/auth.service';
import { AuthGuardGuard } from './shared/guard/auth.guard';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    AuthModule,
    FuncionariosModule,
    CasherModule,
    ProfitListModule,
    StatisticsModule,
    RequestModule,
    HttpClientModule,
    HotToastModule.forRoot(),
  ],
  providers: [interceptors, AuthService, AuthGuardGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
