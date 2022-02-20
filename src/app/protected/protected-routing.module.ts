import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeskComponent } from './desk/desk.component';

const routes: Routes = [{
  path:'',
  component:DeskComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
