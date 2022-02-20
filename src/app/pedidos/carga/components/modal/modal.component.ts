import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { saborAlf, saboresHelado, salsa } from 'src/app/interfaces/interfaces';
import { PedidosService } from 'src/app/pedidos/pedidos.service';
import { PreciosService } from 'src/app/services/precios.service';
import { SaboresService } from 'src/app/services/sabores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  //BANDERA 
  checked:boolean = true;

  
  //SUBTOTAL HELADO - SALSA
  subtotalSalsa:number=0;

  salsastemplate: salsa [] = [
    {nombre:"salsaFrutilla", desc:"Frutilla"},
    {nombre:"salsaChocolate", desc:"Chocolate"},
    {nombre:"salsaDdl", desc:"Ddl"}
  ] 

  saborestemplate : saborAlf[] = [
    { nombre: "Chocolate" , desc: "Chocolate"},
    { nombre: "Ddl" , desc: "Ddl"},
    { nombre: "Crema" , desc: "Crema"}
  ]

  //FORMULARIO PARA CAPTAR LOS INPUTS DEL USUARIO-------------------------------------
  miFormulario: FormGroup = this.fb.group({
    salsaFrutilla: [false],
    salsaChocolate:[false],
    salsaDdl:[false],
    Alfsabor:[null],
    BombonUnidad:[null],
    contador:[1,[Validators.min(1)]],
    local:[''],
    direccion:['']
  });

  get artSelec(){
    return this.ps.artSelec;
  }

  get totalPedido(){
    return this.ps.totalPedido;
  }

  get carrito(){
    return this.ps.carrito;
  }

  get sabores(){
    return this.sab.sabores;
  }

  get precioSalsas(){
    return this.pre.precios.find(item=>item.name=='Salsas');
  }

  get precioBombones(){
    return this.pre.precios.filter(item=>item.name=="Bombon Caja" || item.name=="Bombón Suizo");
  }

  constructor(private pre:PreciosService, private ps:PedidosService, private sab:SaboresService, private fb:FormBuilder) { } 

  ngOnInit(): void {
  }

  //detecta si algun elemento de sabores fue chekeado
  change($event:any, sab: saboresHelado){
    sab.check = $event.target.checked
    const res=this.sabores.reduce((acc,el)=>(el.check!=false)?acc+=1:acc ,0) ;
    ((res==0)||(res>=4))?this.checked=true:this.checked=false;
  }   

  sumaCant(){
    this.miFormulario.value.contador++;
   }


   difCant(){
    if(this.miFormulario.value.contador<=1) return;
    this.miFormulario.value.contador--;
  }

    //agrega al carrito
    agregaCarrito(){
      if (!this.validacionAgregarCarrito()) return ;
      this.agregarAlPedido();
    }
    
  
    ///VALIDACIONES-----------------------------------------------------------------------------------------
  
    validacionAgregarCarrito():boolean{
      const el = document.getElementById("success");
  
      //validacion 1/4 1/2 1kilo------------------------------------------------------------------
      if((this.artSelec.name == '1/4 Kilo' || this.artSelec.name =='1/2 Kilo' ||  this.artSelec.name =='1 Kilo'))
      { 
        if(this.checked==false){
          Swal.fire("Agregado al Carrito","",'success')
          el?.setAttribute('href', 'pedidos#');
          // this.miFormulario.reset();
          this.checked=true;
          return true;
        }
        else
        {
          Swal.fire("Mínimo 1 sabor , Máximo 3","",'error')
          el?.setAttribute('href', 'pedidos#ventanaModal');
          return false
        }
      };
  
      //validacion Alfajor Helado------------------------------------------------------
      if( (this.artSelec.name=="Alfajor Helado")){
       
          if(this.miFormulario.value.Alfsabor===null || this.miFormulario.valid===false){
            
            el?.setAttribute("href","pedidos#ventanaModal");
            Swal.fire('Selecciona una opción o verifique la cantidad','','error');
            return false;
          }else{
              el?.setAttribute("href","pedidos#");
              Swal.fire("Agregado al Carrito",'','success');
              // this.miFormulario.reset();
              return true;
          }
      }
  
      //validacion Bombon Suizo---------------------------------------------------------
      if( (this.artSelec.name=="Bombón Suizo")){
       
        if(this.miFormulario.value.BombonUnidad===null || this.miFormulario.valid===false){
          
          el?.setAttribute("href","pedidos#ventanaModal");
          Swal.fire('Selecciona una opción o verifique la cantidad','','error');
          return false;
        }else{
  
            el?.setAttribute("href","pedidos#");
            Swal.fire("Agregado al Carrito",'','success');
            // this.miFormulario.reset();
            return true;
        }
      }
      
      //validacion tiramizu , chocotorta , galleta limon , cucucrucho------------------------------------
      if((this.artSelec.name=='Chocotorta')||(this.artSelec.name == 'Tiramisú')||(this.artSelec.name == 'Cucurucho')||(this.artSelec.name == 'Galleta Limón')){
        
        if(this.miFormulario.valid===false){
          
          el?.setAttribute("href","pedidos#ventanaModal");
          Swal.fire('Verifique la cantidad','','error');
          return false;
        }else{
            el?.setAttribute("href","pedidos#");
            Swal.fire("Agregado al Carrito",'','success');
            // this.miFormulario.reset();
            return true;
        }
      }
      return true;
    } 
  
    ///AGREGAMOS AL CARRITO-------------------------------------------------------------
    agregarAlPedido(){
      switch (this.artSelec.name) {
        case '1/4 Kilo': case '1/2 Kilo':case '1 Kilo' : 
          this.artSelec.cant=1;
          this.artSelec.sabores=this.sabores.reduce((acc,sab)=>{return(sab.check!=false)?acc+sab.nombre+", ":acc},'');
          this.artSelec.salsas= `${this.miFormulario.value.salsaFrutilla?'Frutilla':""} ${this.miFormulario.value.salsaChocolate?'Chocolate':""} ${this.miFormulario.value.salsaDdl?'Ddl':""} `;
          this.subtotalSabores();
          this.pushAndReset('');
          break;
  
        case 'Alfajor Helado':
          this.artSelec.totalSalsas=0;
          this.pushAndReset(this.miFormulario.value.Alfsabor);
          break;      
  
        case 'Bombón Suizo':
          this.artSelec.totalSalsas=0;
          this.pushAndReset(this.miFormulario.value.BombonUnidad);
          break;
  
        case 'Chocotorta':
          this.artSelec.totalSalsas=0;
          this.pushAndReset('Chica (8 Porciones)');
          break;
  
        case 'Tiramisú':
          this.artSelec.totalSalsas=0;
          this.pushAndReset('10 Porciones');
          break;
  
        case 'Cucurucho':
          this.artSelec.totalSalsas=0;
          this.pushAndReset('');
          break;
  
        case 'Galleta Limón':
          this.artSelec.totalSalsas=0;
          this.pushAndReset('');
          break;
              
                default:
                break;
              }
            }
            
            
     pushAndReset(desc:string){
              this.artSelec.desc=desc;
              this.artSelec.cant=this.miFormulario.value.contador;
              let art = {...this.artSelec};
              (art.desc=='Caja x 6')?art.precio=this.precioBombones[0].precio:art.precio;
              (art.desc=='Unidad')?art.precio=this.precioBombones[1].precio:art.precio;
              this.carrito.push(art);
              this.resetInputs();
              this.sumaTotal();
            } 
     resetInputs(){
               this.sab.sabores.map(item=>item.check=false);
               this.miFormulario.reset();
               this.miFormulario.reset({contador:1})
            } 
            
     subtotalSabores(){
    
              this.subtotalSalsa=0;
              (this.miFormulario.value.salsaFrutilla)?this.subtotalSalsa+=this.precioSalsas!.precio:this.subtotalSalsa;
              (this.miFormulario.value.salsaChocolate)?this.subtotalSalsa+=this.precioSalsas!.precio:this.subtotalSalsa;
              (this.miFormulario.value.salsaDdl)?this.subtotalSalsa+=this.precioSalsas!.precio:this.subtotalSalsa;
              this.artSelec.totalSalsas=this.subtotalSalsa;
            }
            
     sumaTotal(){
              let totalPedido = this.carrito.reduce((acc,item )=>acc+=((item.precio*item.cant)+item.totalSalsas),0);
              this.ps.sumaTotal(totalPedido);
            }
           


}
