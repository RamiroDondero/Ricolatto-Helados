import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {


  miFormulario : FormGroup = this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(6)]]
  })


  constructor(private fb:FormBuilder,private rt:Router,private authService:AuthService) { }

  login(){
    const {email,password}= this.miFormulario.value
    this.authService.login(email,password).subscribe((ok)=>{
      if(ok===true){
        this.rt.navigateByUrl('/desk');
      }else{
        if(!ok){ok="Credenciales invalidas"}
        Swal.fire('Error',ok,'error')
      }
      console.log('llamando observable login');
    })
  }

  

}
