import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

import {
  DONACIONProductosService,
  TokenPayloadE,
  UserDetailsE,
} from "../../../../../services/donacionProducto.service";

// SWEETALERT 2
// declarar variable de esta manera para que no marque err
declare var require: any;
const Swal = require("sweetalert2");

@Component({
  selector: "app-donacion-nopagada-cliente",
  templateUrl: "./donacion-nopagada-cliente.component.html",
  styleUrls: ["./donacion-nopagada-cliente.component.scss"],
})
export class DonacionNOPagadaClienteComponent implements OnInit {
  public DonacionesListadas: Array<any> = [];
  loading: boolean = false;
  Buscador_Clientes: any;
  pageActual: number = 1;

  constructor(
    private router: Router,
    private donacionService: DONACIONProductosService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.ListDonacionesNoPagadas();
  }

  public ListDonacionesNoPagadas() {
    this.DonacionesListadas = [];

    this.donacionService.DonacionesNoPagadas().subscribe(
      (products) => {
        console.log(products);
        this.DonacionesListadas = products;
        this.loading = true;
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
