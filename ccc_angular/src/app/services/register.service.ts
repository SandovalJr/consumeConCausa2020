import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  baseUrl = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  public registroEmpresa(Datos: any){
    return this.http.post(
      `${this.baseUrl}/api/empresa/registerEmpresa`, Datos
    );
  }
}
