import { CasherComponent } from './casher.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from '../shared/guard/auth.guard';

const routes: Routes = [
  {
    path: 'valor-do-dia',
    component: CasherComponent,
    canActivate: [AuthGuardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CasherRoutingModule {}
