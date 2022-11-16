import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from 'src/app/shared/guard/auth.guard';
import { StatisticsComponent } from './statistics.component';

const routes: Routes = [
  {
    path: 'estatisticas',
    component: StatisticsComponent,
    canActivate: [AuthGuardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatisticsRoutingModule {}
