import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-envio',
  templateUrl: './envio.component.html',
  styleUrls: ['./envio.component.css']
})
export class EnvioComponent implements OnInit {

  constructor(private rt:Router) { }

  ngOnInit(): void {
    
  }

  delivery(){
    setTimeout(() => {
      this.rt.navigateByUrl('/pedidos');
    }, 2000);
  }

}
