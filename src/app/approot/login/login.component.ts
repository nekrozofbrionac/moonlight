import { Component } from '@angular/core';
import { LoginService } from "../../../lib/services/login.service";
import { PocketbaseService } from "../../../lib/services/internal/pocketbase.service";

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
    private readonly pb: PocketbaseService,
  ) {
  }


  login() {
    this.loginService.login(this.loginUsername, this.loginPassword).subscribe((success) => {
      console.log(success);
      console.log(this.loginService.getSelfUser());
    })
  }

  test() {
    const selfUser = this.loginService.getSelfUser();
    if (selfUser === undefined) {
      console.log('Not logged in');
      return;
    }
    this.pb.get.collection('channels').getList(1, 50, {
      filter: `users~"${ selfUser.id }"`,
    }).then((result) => {
      console.log(result);
    });
  }
}
