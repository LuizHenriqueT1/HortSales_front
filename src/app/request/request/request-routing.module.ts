import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from 'src/app/shared/guard/auth.guard';
import { RequestComponent } from './request.component';

const routes: Routes = [
  {
    path: 'fazer-pedido',
    component: RequestComponent,
    canActivate: [AuthGuardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestRoutingModule {}
