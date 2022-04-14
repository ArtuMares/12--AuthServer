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
    name:["Test4", [Validators.required]],
    email: ["test4@test.com", [Validators.required, Validators.email]],
    password: ["123456", [Validators.required, Validators.minLength(6)]],
  });

  nuevoUsuario(){
    const {name, email, password} = this.miFormulario.value;
    this.as.registro(name, email, password).subscribe(ok=>{
      console.log(ok);
      if(ok === true){
        this.router.navigateByUrl("/dashboard");
      }else{
        Swal.fire("Error", ok, "error")
      }
    });

  }
}
