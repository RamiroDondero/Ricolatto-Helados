import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { precio } from 'src/app/interfaces/interfaces';
import Swal from 'sweetalert2';
import { PedidosService } from '../pedidos.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    local:[''],
    direccion:['']
  });


  get totalPedido(){
    return this.ps.totalPedido;
  }


  get artSelec(){
    return this.ps.artSelec;
  }
  get carrito(){
    return this.ps.carrito;
  }

  constructor(private ps:PedidosService, private fb:FormBuilder) { }

  ngOnInit(): void {
  }

   //captura la informacion del elemento seleccionado para abrir la modal
   eligeArt(item:precio){
    this.ps.artSelecmod(item);
    console.log(this.artSelec);
  }

  eliminardelPedido(){
    this.artSelec.check=true;
    let carrito =this.carrito.filter(art=>art.check!=true);
    this.ps.carritoMod(carrito);
    Swal.fire('Eliminado','','success');
  }

  resetInputs(){
    this.miFormulario.reset();
  }

 

  armarWhatsapp(){
    const el = document.getElementById("enviarPedido");
    if(this.miFormulario.value.local===null || this.miFormulario.value.direccion==""){
      el?.setAttribute("href","pedidos#enviar");
      Swal.fire('Faltan Campos' ,'', 'error' ); 
      return;
    }

    const mensaje = this.carrito.reduce((acum,item)=>{
      
      item.salsas = (item.salsas?.trim().length === 0 )? "-" : item.salsas ;  


      switch(item.name){
        
        case "1/4 Kilo" : case "1/2 Kilo" : case "1 Kilo" :
        return acum + `* ${item.cant} x "${item.name}" %0A Sabores: ${item.sabores} %0A Salsas: ${item.salsas} %0A `
        
        case "Alfajor Helado" :
        return acum + `* ${item.cant} x "${item.name}" , Sabor: ${item.desc} %0A `
        
        case "Bombón Suizo" :
        return acum + `* ${item.cant} x "${item.name}" ,  ${item.desc} %0A`

        default :
        return acum + `* ${item.cant} x "${item.name}" %0A`

      }
      


    },"");

    let url = "https://api.whatsapp.com/send?phone=542235761401&text=*_HELADOS RICOLATTO_*%0A*SUCURSAL: "
              +(this.miFormulario.value.local)
              +"*%0A*DIRECCION DE ENVIO: "+ this.miFormulario.value.direccion 
              +"*%0A*TOTAL: $"+this.totalPedido
              +"*%0A"+ mensaje;
    window.open(url);

    this.ps.carritoMod([]);
    
  }


}
