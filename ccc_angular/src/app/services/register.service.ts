import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
// import { userInfo } from 'os';

export interface UserDetailsE {
  id_empresa: number;
  nombre: string;
  apellidos: string;
  nombre_empresa: string;
  correo: string;
  telefono: string;
  giro_empresa: string;
  direccion: string;
  cp: number;
  ciudad: string;
  rfc: string;
  descripcion: string;
  imagen: string;
  link_fb: string;
  link_whatsapp: string;
  password: string;
  exp: number;
  iat: number;
}

export interface TokenPayloadE {
  id_empresa: number;
  nombre: string;
  apellidos: string;
  nombre_empresa: string;
  correo: string;
  telefono: string;
  giro_empresa: string;
  direccion: string;
  cp: number;
  ciudad: string;
  rfc: string;
  descripcion: string;
  imagen: string;
  link_fb: string;
  link_whatsapp: string;
  password: string;
}

@Injectable({
  providedIn: "root",
})
export class RegisterService {
  baseUrl = "http://localhost:3000/api/empresa/";

  constructor(private http: HttpClient) {}

  // REGISTRAR EMPRESA
  public registroEmpresa(Datos: any) {
    return this.http.post(`${this.baseUrl}registerEmpresa`, Datos);
  }
  // LISTAR TODAS LAS EMPRESAS YA SEA APROBADAS (1) O NO APROBADAS (0)
  public ListEmpresas(status: any): Observable<any> {
    return this.http.get(`${this.baseUrl}ListarEmpresasPorStatus/${status}`);
  }

  public EliminarEmpresa(id_empresa: any) {
    return this.http.get(`${this.baseUrl}/EliminarEmpresa/${id_empresa}`);
  }
}
