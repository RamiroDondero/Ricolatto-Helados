import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { saboresHelado } from '../../interfaces/interfaces';
import { SaboresService } from '../../services/sabores.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import * as M from 'materialize-css';
import { PreciosService } from '../../services/precios.service';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-desk',
  templateUrl: './desk.component.html',
  styleUrls: ['./desk.component.css']
})
export class DeskComponent implements OnInit {

  ok : boolean = false;
  
  miFormulario:FormGroup = this.fb.group({
    nombre:["",[Validators.required]],
  })

  formPrecios:FormGroup = this.fb.group({
    articulos: this.fb.array([],Validators.required) 
  })

  get precios(){
    return this.pre.precios;
  }
  
  get sabores(){
    return this.sab.sabores;
  }

  get articulosArr(){
    return this.formPrecios.get('articulos') as FormArray
  }


  constructor(private authService:AuthService, private rt:Router, private sab:SaboresService, private fb:FormBuilder, private pre:PreciosService) { }

  ngOnInit(): void {

    //iniicializamos ventana modal
    var modal = document.querySelectorAll('.modal');
    M.Modal.init(modal, {});

    //iniicializamos las listas
    this.cargarPrecios();
    this.sab.cargarSabores().subscribe();
    
  }

  logout(){
    this.authService.logout();
    this.rt.navigateByUrl('/home');
  }

  /// FUNCIONES PARA LA LISTA DE SABORE-------------------------------------------------------------------------------------------------

  //detecta si algun elemento de sabores fue chekeado
  change($event:any, sab: saboresHelado){
    sab.check = $event.target.checked

    const res = this.sabores.every(element=>element.check==false);
    (res==true)?this.ok=false:this.ok=true;
    
  }   

  //elimina los sabores seleccionados
  eliminarSeleccion(){
    const eliminados = this.sabores.filter((el)=>{return el.check!=false})
    this.sab.eliminarSabor(eliminados);
    this.ok = false;
    Swal.fire("Sabores Eliminados","",'success') 
  }
 
  //crea un nuevo sabor
  nuevoSabor(){
    this.sab.crearSabor(this.miFormulario).subscribe((ok)=>{
      (ok===true)?Swal.fire("Sabor Creado",'',"success"):Swal.fire("Error",ok.error.msg,"error");
    });
    this.miFormulario.reset();
  }


  ///FUNCIONES PARA LA LISTA DE PRECIOS----------------------------------------------------------------------------

   cargarPrecios(){
     this.pre.cargarPrecios().pipe(
      map((precios)=>{
        this.precios.forEach(el=>{
        this.articulosArr.push(new FormControl(el.precio,Validators.required))
        }); 
        return precios; 
      })
      ).subscribe();
   }

   guardarPrecios(){
      this.precios.forEach((element, index)=>{
        let name:string = element.name;
        let preciocontrol :number =(this.articulosArr.value)[index];
        let precio = (preciocontrol==null) ? element.precio : preciocontrol;
        this.pre.guardarPrecios(name,precio);
      })
   }
   

}
