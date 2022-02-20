import { Component, OnInit } from '@angular/core';
import { SaboresService } from '../../services/sabores.service';
import { saboresHelado } from '../../interfaces/interfaces';

@Component({
  selector: 'app-sabores',
  templateUrl: './sabores.component.html',
  styleUrls: ['./sabores.component.css']
})
export class SaboresComponent implements OnInit {

  get sabores():saboresHelado[]{
    return this.sab.sabores;
  }

  constructor(private sab:SaboresService) { }

  ngOnInit(): void {
    this.sab.cargarSabores().subscribe();
  }

}
