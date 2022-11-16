import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from '../shared/guard/auth.guard';
import { ProfitListComponent } from './profit-list.component';

const routes: Routes = [
  {
    path: 'lista-de-lucros',
    component: ProfitListComponent,
    canActivate: [AuthGuardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfitListRoutingModule {}
