import { Injectable } from '@angular/core';
import { DbAccessService } from './db-access.service';
import { precio } from '../interfaces/interfaces';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PreciosService {

  private _precios : precio[] = [];

  get precios(){
    return this._precios;
  }
  
  
  constructor(private db:DbAccessService) { }

  cargarPrecios(): Observable<precio[]>{
   return  this.db.mostrarPrecios().pipe(
     tap(precios=>this._precios = precios)
   );
  }

  guardarPrecios(name:string, precio:number){
    this.db.modificarPrecio(name,precio).subscribe(()=>console.log('subscribe guardar precios'));
    Swal.fire("Precios Guardados",'',"success");
  }
}
