import { RouterModule, Routes } from "@angular/router";
import { Component } from "@angular/core";
import { SpaComponent } from "../components/spa/spa.component";
import { LoginComponent } from "../components/sw/login/login.component";

// REGISTROS
import { RegistrosComponent } from "../components/sw/registros/registros.component";
import { RegistroEmpresaComponent } from "../components/sw/registros/registro-empresa/registro-empresa.component";
import { RegistroClientesComponent } from "../components/sw/registros/registro-clientes/registro-clientes.component";

// ADMINISTRADOR
import { AdminComponent } from "../components/sw/usertypes/admin/admin.component";
import { InicioadminComponent } from "../components/sw/usertypes/admin/inicioadmin/inicioadmin.component";
import { ListClientesAdminComponent } from "../components/sw/usertypes/admin/list-clientes-admin/list-clientes-admin.component";
import { EditInfoClienteAdminComponent } from "../components/sw/usertypes/admin/list-clientes-admin/edit-info-cliente-admin/edit-info-cliente-admin.component";
import { EmpresasAceptadasComponent } from "../components/sw/usertypes/admin/listEmpresas/empresas-aceptadas/empresas-aceptadas.component";
import { EmpresasEnEsperaComponent } from "../components/sw/usertypes/admin/listEmpresas/empresas-en-espera/empresas-en-espera.component";
import { VerInfoEmpresaComponent } from "../components/sw/usertypes/admin/listEmpresas/ver-info-empresa/ver-info-empresa.component";

// CLIENTE
import { ClienteComponent } from "../components/sw/usertypes/cliente/cliente.component";
import { InicioClienteComponent } from "../components/sw/usertypes/cliente/inicio-cliente/inicio-cliente.component";

// EMPRESA
import { EmpresaComponent } from "../components/sw/usertypes/empresa/empresa.component";
import { InicioEmpresaComponent } from "../components/sw/usertypes/empresa/inicio-empresa/inicio-empresa.component";

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
    path: "AdministradorCCC",
    component: AdminComponent,
    children: [
      { path: "Inicio_Administrador", component: InicioadminComponent },
      { path: "Lista_Clientes", component: ListClientesAdminComponent },
      {
        path: "EditarInformacioCliente/:id_cliente",
        component: EditInfoClienteAdminComponent,
      },
      {
        path:"EmpresasAceptadas/:status",
        component: EmpresasAceptadasComponent,
      },
      {
        path:"Empresas_EnEspera/:status",
        component: EmpresasEnEsperaComponent,
      },
      {
        path:"Informacion_Empresa/:id_empresa",
        component: VerInfoEmpresaComponent,
      }
    ],
  },
  {
    path: "empresa/:id",
    component: EmpresaComponent,
    children: [{ path: "Inicio_Cliente", component: InicioClienteComponent }],
  },
  {
    path: "cliente/:id",
    component: ClienteComponent,
    children: [{ path: "Inicio_Empresa", component: InicioEmpresaComponent }],
  },
];

export const APP_ROUTES = RouterModule.forRoot(routes);
