import { Component, OnInit } from '@angular/core';
import { saboresHelado, salsa, precio, saborAlf } from '../interfaces/interfaces';
import { PreciosService } from '../services/precios.service';
import { SaboresService } from '../services/sabores.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { PedidosService } from './pedidos.service';




@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  
 

   constructor(private pre:PreciosService, private sab:SaboresService, private fb:FormBuilder, private ps:PedidosService) { }

  //CARGAMOS LOS SERVICIOS-------------------------------------
  ngOnInit(): void {
    window.scrollTo(0,0);
    this.pre.cargarPrecios().subscribe();
    this.sab.cargarSabores().subscribe();
  }

  


}
 