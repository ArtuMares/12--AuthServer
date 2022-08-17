import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from "sweetalert2";

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent  {
  constructor(private fb:FormBuilder, private router:Router, private as:AuthService) { }

  miFormulario:FormGroup = this.fb.group({
    name:["", [Validators.required]],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]],
    registro: ["", [Validators.required]],
    carrera: ["", [Validators.required]],
  });

  nuevoUsuario(){
    const {name, email, password, registro, carrera} = this.miFormulario.value;
    this.as.registro(name, email, password, registro, carrera).subscribe(ok=>{
      console.log(ok);
      if(ok === true){
        this.router.navigateByUrl("./dashboard");
      }else{
        Swal.fire("Error", ok, "error")
      }
    });

  }
}
