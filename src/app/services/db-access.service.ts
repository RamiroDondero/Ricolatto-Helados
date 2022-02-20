import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { dbAccessResponse, precio, saboresHelado } from '../interfaces/interfaces';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DbAccessService {

  private baseUrl : string = environment.baseUrl;
  
  constructor(private http: HttpClient) { }

  //SABORES HELADOS------------------------------------------

  crearSabor(nombre:string):Observable<any>{

    const url = `${this.baseUrl}/sab/new`;
    const body = {nombre}

    return this.http.post<dbAccessResponse>(url,body).pipe(
      map((resp)=>resp.ok),
      catchError(error=>of(error))
    )

  } 

  mostrarSabores():Observable<Array<saboresHelado>>{

    const url = `${this.baseUrl}/sab/view`;
    return this.http.get<Array<saboresHelado>>(url).pipe(
      catchError(error=>of(error.error.msg))
    ) 
  }

  eliminarSabor(nombre:string):Observable<dbAccessResponse>{
    const url = `${this.baseUrl}/sab/del`;
    const body = {nombre}

    return this.http.post<dbAccessResponse>(url,body);

  }

  //PRECIOS-----------------------------------------
 
  mostrarPrecios():Observable<Array<precio>>{
    const url = `${this.baseUrl}/pre/view`; 
    return this.http.get<Array<precio>>(url).pipe(
      catchError(error=>of(error.error.msg))
    )
   }

   modificarPrecio(name:string, precio:number):Observable<precio>{
    const url = `${this.baseUrl}/pre/new`;
    const body = {name,precio}
    return this.http.post<precio>(url,body).pipe(
      catchError(error=>of(error.error.msg))
    )
   }


  








}
