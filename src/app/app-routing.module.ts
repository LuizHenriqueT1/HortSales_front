import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeaderComponent } from './core/components/header/header.component';
import { AuthGuardGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  {
    path: '', component: HeaderComponent, canActivate: [AuthGuardGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
