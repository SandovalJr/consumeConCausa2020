import { RouterModule, Routes } from "@angular/router";
import { Component } from "@angular/core";
import { SpaComponent } from "../components/spa/spa.component";
import { LoginComponent } from "../components/sw/login/login.component";

// REGISTROS
import { RegistrosComponent } from "../components/sw/registros/registros.component";
import { RegistroEmpresaComponent } from "../components/sw/registros/registro-empresa/registro-empresa.component";
import { RegistroClientesComponent } from "../components/sw/registros/registro-clientes/registro-clientes.component";
import { ClienteComponent } from '../components/sw/usertypes/cliente/cliente.component';
import { EmpresaComponent } from '../components/sw/usertypes/empresa/empresa.component';

const routes: Routes = [
  { path: "", component: SpaComponent },
  {
    path: "LogIn",
    component: LoginComponent,
  },
  {
    path: "Resgistrate",
    component: RegistrosComponent,
  },
  {
    path: "Registrate_Empresa",
    component: RegistroEmpresaComponent,
  },
  {
    path: "Registrate_Cliente",
    component: RegistroClientesComponent,
  },
  {
    path: "empresa/:id",
    component: EmpresaComponent,
  },
  {
    path: "cliente/:id",
    component: ClienteComponent,
  },
];

export const APP_ROUTES = RouterModule.forRoot(routes);
