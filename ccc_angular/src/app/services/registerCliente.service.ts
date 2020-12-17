import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
// import { userInfo } from 'os';

export interface UserDetails {
  id_cliente: number;
  nombre: string;
  apellidos: string;
  correo: string;
  telefono: string;
  fecha_de_nacimiento: string;
  genero: string;
  password: string;
  exp: number;
  iat: number;
}

export interface TokenPayload {
  id_cliente: number;
  nombre: string;
  apellidos: string;
  correo: string;
  telefono: string;
  fecha_de_nacimiento: string;
  genero: string;
  password: string;
}

@Injectable()
export class ClienteService {
  private token: string;
  baseUrl = "http://localhost:3000/api/clientes/";
  /// baseUrl = '';
  constructor(private http: HttpClient, private router: Router) {}

  // REGISTRAR USUARIO
  public registerCliente(user: TokenPayload): Observable<any> {
    console.log(user);
    return this.http.post(this.baseUrl + `registerCliente`, user);
  }

  // LISTAR TODOS LOS CLIENTES
  public ListClientes(): Observable<any> {
    return this.http.get(`${this.baseUrl}listarclientes`);
  }
}
