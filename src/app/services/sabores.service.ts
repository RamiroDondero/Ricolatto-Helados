import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map, tap } from 'rxjs/operators';
import { saboresHelado } from '../interfaces/interfaces';
import { DbAccessService } from './db-access.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaboresService {

  private _sabores : saboresHelado[] = [];

  get sabores(){
    return [...this._sabores];
  }

  constructor(private db:DbAccessService) { }

  cargarSabores():Observable<void>{
    return this.db.mostrarSabores().pipe(
      map(arr=>{
        this._sabores=arr;
        this._sabores.map(item=>item.check=false);
        this._sabores.sort((a,b)=>{
          if(a.nombre < b.nombre){return -1}
          if(a.nombre > b.nombre){return 1}
          return 0;
        })
      })
    );
  }


  
  eliminarSabor(eliminados:saboresHelado[]){
    eliminados.forEach(eliminado => {this.db.eliminarSabor(eliminado.nombre).subscribe();});
    this._sabores = this._sabores.filter(sab=>sab.check==false);
  }

  crearSabor(miForm:FormGroup){
    const nombre:string =miForm.value.nombre;
    return this.db.crearSabor(nombre).pipe(
      tap(()=>this.cargarSabores().subscribe())
    );
  }



}
