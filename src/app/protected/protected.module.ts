import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProtectedRoutingModule } from './protected-routing.module';

import { DeskComponent } from './desk/desk.component';


@NgModule({
  declarations: [
    DeskComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProtectedModule { }
