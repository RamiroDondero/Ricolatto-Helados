import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidosComponent } from './pedidos.component';

const routes: Routes = [{
  path:"",
  component:PedidosComponent
},
{
  path:"**",
  redirectTo:""
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
