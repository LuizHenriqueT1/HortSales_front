import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from '../shared/guard/auth.guard';
import { FuncionarioCreateComponent } from './funcionario-create/funcionario-create/funcionario-create.component';
import { FuncionarioDeleteComponent } from './funcionario-delete/funcionario-delete/funcionario-delete.component';
import { FuncionarioDetailsComponent } from './funcionario-details/funcionario-details/funcionario-details.component';
import { FuncionarioUpdateComponent } from './funcionario-update/funcionario-update/funcionario-update.component';
import { FuncionariosComponent } from './funcionarios.component';

const routes: Routes = [
  {
    path: 'funcionarios',
    component: FuncionariosComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'create-funcionario',
    component: FuncionarioCreateComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'editar-funcionario/:id',
    component: FuncionarioUpdateComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'detalhes/:id',
    component: FuncionarioDetailsComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'deletar/:id',
    component: FuncionarioDeleteComponent,
    canActivate: [AuthGuardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FuncionariosRoutingModule {}
