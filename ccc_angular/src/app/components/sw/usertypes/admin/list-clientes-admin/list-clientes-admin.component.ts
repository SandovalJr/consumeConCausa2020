import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from "@angular/core";
import { fromEvent } from "rxjs";
import { debounceTime, take, pluck, switchMap } from "rxjs/operators";
import { Routes, Router } from "@angular/router";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import {
  ClienteService,
  TokenPayload,
  UserDetails,
} from "../../../../../services/registerCliente.service";

// SWEETALERT 2
// declarar variable de esta manera para que no marque err
declare var require: any;
const Swal = require("sweetalert2");

@Component({
  selector: "app-list-clientes-admin",
  templateUrl: "./list-clientes-admin.component.html",
  styleUrls: ["./list-clientes-admin.component.scss"],
})
export class ListClientesAdminComponent implements OnInit {
  public UsuariosListados: Array<any> = [];

  constructor(
    private router: Router,
    private clienteService: ClienteService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.listClientes();
  }

  public listClientes() {
    this.UsuariosListados = [];
    this.clienteService.ListClientes().subscribe(
      (clientes) => {
        console.log(clientes);
        this.UsuariosListados = clientes;
      },
      (err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algo salio mal!",
        });
        console.error(err);
      }
    );
  }
}
