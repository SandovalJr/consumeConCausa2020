
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { SpaComponent } from './components/spa/spa.component';
import { NavbarComponent } from './components/spa/partials/navbar/navbar.component';
import { VideoInicioComponent } from './components/spa/partials/video-inicio/video-inicio.component';

@NgModule({
  declarations: [
    AppComponent,
    SpaComponent,
    NavbarComponent,
    VideoInicioComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
