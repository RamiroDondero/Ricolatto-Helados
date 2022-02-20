import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { IntroComponent } from './intro/intro.component';
import { GaleriaComponent } from './galeria/galeria.component';
import { SaboresComponent } from './sabores/sabores.component';
import { LocalesComponent } from './locales/locales.component';
import { EnvioComponent } from './envio/envio.component';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [
    IntroComponent,
    GaleriaComponent,
    SaboresComponent,
    LocalesComponent,
    EnvioComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
  ]
})
export class HomeModule { }
