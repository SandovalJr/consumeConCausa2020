import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";

import { MDBBootstrapModule } from "angular-bootstrap-md";
import { FormsModule } from "@angular/forms";
import { SpaComponent } from "./components/spa/spa.component";
import { NavbarComponent } from "./components/spa/partials/navbar/navbar.component";
import { VideoInicioComponent } from "./components/spa/partials/video-inicio/video-inicio.component";
import { BannerverdeComponent } from "./components/spa/partials/bannerverde/bannerverde.component";
import { UneteALaCausaComponent } from "./components/spa/partials/unete-a-la-causa/unete-a-la-causa.component";
import { LineasComponent } from "./components/spa/partials/lineas/lineas.component";
import { CumplirSuenosComponent } from "./components/spa/partials/cumplir-suenos/cumplir-suenos.component";
import { ComoComprarComponent } from "./components/spa/partials/como-comprar/como-comprar.component";
import { PreguntasFrecuentesComponent } from "./components/spa/partials/preguntas-frecuentes/preguntas-frecuentes.component";
import { FooterComponent } from "./components/spa/partials/footer/footer.component";
import { APP_ROUTES } from "../app/routes/routes";
import { LoginComponent } from './components/sw/login/login.component';
import { RegistrosComponent } from './components/sw/registros/registros.component';
import { RegistroEmpresaComponent } from './components/sw/registros/registro-empresa/registro-empresa.component';
import { RegistroClientesComponent } from './components/sw/registros/registro-clientes/registro-clientes.component';
@NgModule({
  declarations: [
    AppComponent,
    SpaComponent,
    NavbarComponent,
    VideoInicioComponent,
    BannerverdeComponent,
    UneteALaCausaComponent,
    LineasComponent,
    CumplirSuenosComponent,
    ComoComprarComponent,
    PreguntasFrecuentesComponent,
    FooterComponent,
    LoginComponent,
    RegistrosComponent,
    RegistroEmpresaComponent,
    RegistroClientesComponent,
  ],
  imports: [
    APP_ROUTES,
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
