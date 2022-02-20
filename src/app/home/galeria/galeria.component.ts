
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent implements OnInit, OnDestroy {
  
  sliderInterval! : any;

  constructor() { }
  
  
   ngOnInit() : void {
      const slider = document.querySelector("#slider");  
      const _sliderInterval = setInterval(() => {
        let slider_items_first = document.querySelectorAll('.slider_img')[0];
        slider?.insertAdjacentElement('beforeend',slider_items_first);
      }, 7000);
      this.sliderInterval=_sliderInterval;
  }

  ngOnDestroy(): void {
      clearInterval(this.sliderInterval);
  }

  next(){
    const slider = document.querySelector("#slider");
    let slider_items_first = document.querySelectorAll('.slider_img')[0];
    slider?.insertAdjacentElement('beforeend',slider_items_first);
  }

  back(){
    const slider = document.querySelector("#slider");
    const galeria = document.querySelectorAll('.slider_img');
    const tamano_galeria = galeria.length;
    let slider_items_last = document.querySelectorAll('.slider_img')[tamano_galeria-1];
    slider?.insertAdjacentElement('afterbegin',slider_items_last);
    
  }

}
