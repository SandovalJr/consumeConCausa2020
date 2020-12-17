import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import { Routes, Router } from "@angular/router";

@Component({
  selector: "app-sidenavadmin",
  templateUrl: "./sidenavadmin.component.html",
  styleUrls: ["./sidenavadmin.component.scss"],
})
export class SidenavadminComponent implements OnInit {
  mobileQuery: MediaQueryList;
  fillerNav = [
    {
      name: "Inicio",
      route: "/AdministradorCCC/Inicio_Administrador",
      icon: "home",
    },
  ];
  private _mobileQueryListener: () => void;
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia("(max-width: 600px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  shouldRun = true;
  ngOnInit(): void {}

  public InicioAdmin() {
    this.router.navigateByUrl(`/AdministradorCCC/Inicio_Administrador`);
  }
  public ListarClientes() {
    this.router.navigateByUrl(`/AdministradorCCC/Lista_Clientes`);
  }
}
