import { Injectable } from '@angular/core';
import {CanActivate, CanLoad, Router,  } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {

  constructor(private authService:AuthService, private router: Router){}


  canActivate(): Observable<boolean> | boolean{
    console.log("activate");
    return this.authService.validarToken().pipe(
      tap(valid=> !valid ? this.router.navigateByUrl('/admin'):valid)
    );
  }
  canLoad(): Observable<boolean> | boolean {
    console.log("load");
    return this.authService.validarToken().pipe(
      tap(valid=> !valid ? this.router.navigateByUrl('/admin'):valid)
    );
  }
}
