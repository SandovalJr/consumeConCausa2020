import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from '../../../../services/register.service';

@Component({
  selector: 'app-registro-empresa',
  templateUrl: './registro-empresa.component.html',
  styleUrls: ['./registro-empresa.component.scss']
})
export class RegistroEmpresaComponent implements OnInit {

  constructor(private fb: FormBuilder, private registerService: RegisterService) { }

  ngOnInit(): void {
  }

  public registerForm = this.fb.group({
    nombre: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
    nombre_empresa: ['', [Validators.required]],
    correo: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required]],
    giro_empresa: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    cp: ['', [Validators.required]],
    ciudad: ['', [Validators.required]],
    rfc: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    imagen: ['', [Validators.required]],
    link_fb: ['', [Validators.required]],
    link_whatsapp: ['', [Validators.required]],
    password: ['', [Validators.required]],
  })

  registroEmpresa(){
    console.log('Empresa Registrada', this.registerForm.value);
    if(this.registerForm.valid){
      this.registerService.registroEmpresa(this.registerForm.value)
      .subscribe(
        (resp) => {
          console.log('Registro Completo');
        }, 
        (err) =>{
          console.log('Ocurrio un error')
        }
      );
    }else{
      console.log('Campos Incompletos');
    }
  }

  validarRegistro(){

  }
}