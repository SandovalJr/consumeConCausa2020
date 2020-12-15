import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import { LoginService } from '../../../services/login.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  public loginForm = this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  login(){
    this.loginService.login(this.loginForm.value)
      .subscribe(resp => {
        Swal.fire('Cargando', 'Iniciando Sesion', 'info');
        //Navegacion
      }, (err) => {
        console.log(err);
        Swal.fire('Error', 'Error', 'error');
      });
  }

}
