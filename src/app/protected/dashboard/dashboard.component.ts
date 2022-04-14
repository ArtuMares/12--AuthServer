import { Component } from '@angular/core';
import { Router } from '@angular/router';


import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [`
  
    *{
      margin: 20px;
    }
  `
  ]
})
export class DashboardComponent {

  get usuario(){
    return this.as.usuario;
  }


  constructor(private router:Router, private as:AuthService) { }

  logout(){
    this.as.logout();
    this.router.navigateByUrl("/auth");
  }
}
