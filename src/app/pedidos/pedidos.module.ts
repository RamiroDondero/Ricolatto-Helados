import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosRoutingModule } from './pedidos-routing.module';
import { PedidosComponent } from './pedidos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CargaComponent } from './carga/carga.component';
import { CarritoComponent } from './carrito/carrito.component';
import { ModalComponent } from './carga/components/modal/modal.component';


@NgModule({
  declarations: [
    PedidosComponent,
    CargaComponent,
    CarritoComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    PedidosRoutingModule,
    ReactiveFormsModule
  ]
})
export class PedidosModule { }
