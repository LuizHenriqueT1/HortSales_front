import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuncionarioCreateComponent } from './funcionario-create/funcionario-create/funcionario-create.component';
import { FuncionarioDeleteComponent } from './funcionario-delete/funcionario-delete/funcionario-delete.component';
import { FuncionarioDetailsComponent } from './funcionario-details/funcionario-details/funcionario-details.component';
import { FuncionarioUpdateComponent } from './funcionario-update/funcionario-update/funcionario-update.component';
import { FuncionariosComponent } from './funcionarios.component';

const routes: Routes = [
  { path: 'funcionarios', component: FuncionariosComponent },
  { path: 'create-funcionario', component: FuncionarioCreateComponent },
  { path: 'editar/:id', component: FuncionarioUpdateComponent },
  { path: 'detalhes/:id', component: FuncionarioDetailsComponent },
  { path: 'deletar/:id', component: FuncionarioDeleteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuncionariosRoutingModule { }
 