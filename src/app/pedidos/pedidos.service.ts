import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { precio } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

 private _artSelec:precio={name:'',precio:0, cant:1, sabores:"", salsas:"", desc:"", check:false,totalSalsas:0};

 //PROPIEDADES PARA LA SECCION CARRITO-------------------------------------
 private _carrito :precio[]=[];

  //TOTAL DEL PEDIDO
 private _totalPedido:number=0;

  get totalPedido(){
    return this._totalPedido;
  }

  get carrito(){
    return this._carrito;
  }

  get artSelec(){
    return this._artSelec;
  }

  constructor() { }

  artSelecmod(item:precio){
    this._artSelec=item;
  }

  carritoMod(carrito:precio[]){
    this._carrito=carrito;
  }

  sumaTotal(totalPedido:number){
    this._totalPedido = totalPedido;
  }
  




}
