import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import  Swal  from "sweetalert2";

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent  {

  miFormulario: FormGroup = this.fb.group({
    email: ["a20310022@gmail.com", [Validators.required, Validators.email]],
    password: ["20310022", [Validators.required, Validators.minLength(6)]],

  })

  constructor(private fb:FormBuilder, private router:Router, private as:AuthService) { }

  
  login(){
    console.log(this.miFormulario.value);
    const {email, password} = this.miFormulario.value;
    this.as.login(email, password).subscribe(ok=>{
      console.log(ok);
      if(ok === true){
        this.router.navigateByUrl("/dashboard");
      }else{
        Swal.fire("Error", ok, "error")
      }
    });

  }
}
