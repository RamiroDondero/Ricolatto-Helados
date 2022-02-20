import { Component, OnInit } from '@angular/core';
import { precio, saborAlf, saboresHelado, salsa } from 'src/app/interfaces/interfaces';
import { PreciosService } from 'src/app/services/precios.service';
import { PedidosService } from '../pedidos.service';
import { SaboresService } from '../../services/sabores.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.css']
})
export class CargaComponent implements OnInit {

  
  

  //PROPIEDADES PARA CARGAR EL TEMPLATE DEL HTML-----------------------------
  fotos: string [] = [
    '../../assets/images/1-4.png', '../../assets/images/1-2.png', '../../assets/images/1k.png',
    '../../assets/images/chocotorta.png','../../assets/images/tira.png','../../assets/images/alfajor.png',
    '../../assets/images/bombonsuizo.png','../../assets/images/galletaslimon.png','../../assets/images/cucurucho.jpg'
  ]

  

  get galeria(){
    return this.pre.precios.filter(item=>(item.name!='Salsas')&&(item.name!='Bombon Caja'));
  }

  get artSelec(){
    return this.ps.artSelec;
  }

  constructor(private pre:PreciosService, private ps:PedidosService, private sab:SaboresService, private fb:FormBuilder) { }

  ngOnInit(): void {
  }

   //captura la informacion del elemento seleccionado para abrir la modal
   eligeArt(item:precio){
    this.ps.artSelecmod(item);
    console.log(this.artSelec.name)
  }

  
}
