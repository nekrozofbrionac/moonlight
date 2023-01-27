import { Component } from '@angular/core';
import { LoginService } from "../../../lib/services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginUsername: string = '';
  loginPassword: string = '';

  constructor(
    private readonly loginService: LoginService,
  ) {
  }


  login() {
    console.log(this.loginService.getSelfUser());
  }
}
