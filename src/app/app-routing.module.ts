import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from './guards/validar-token.guard';

const routes: Routes = [{
  path:"home",
  loadChildren: ()=> import("./home/home.module").then(m=>m.HomeModule)
},
{
  path:"admin",
  loadChildren:()=> import("./auth/auth.module").then(m=>m.AuthModule)
},
{
  path:"pedidos",
  loadChildren:()=> import("./pedidos/pedidos.module").then(m=>m.PedidosModule)
},
{
  path:"desk",
  loadChildren:()=> import("./protected/protected.module").then(m=>m.ProtectedModule),
  canActivate:[ValidarTokenGuard],
  canLoad:[ValidarTokenGuard]
},
{
  path:"**",
  redirectTo:"home"
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
