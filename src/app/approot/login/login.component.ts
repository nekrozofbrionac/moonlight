import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../../lib/services/login.service";
import { PocketbaseService } from "../../../lib/services/internal/pocketbase.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginUsername: string = '';
  loginPassword: string = '';
  redirectLink: string = '';

  constructor(
    private readonly pb: PocketbaseService,
    private readonly loginService: LoginService,
    private readonly router: Router,
    private readonly activeRoute: ActivatedRoute,
    private readonly snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.activeRoute.queryParamMap.subscribe((params) => {
      if (params.get('redirectTo') !== null) {
        this.redirectLink = params.get('redirectTo')!;
      }
    });
  }

  login() {
    this.loginService.login(this.loginUsername, this.loginPassword).subscribe(() => {
      this.redirectBack();
    }, (error) => {
      if (error.status === 400) {
        this.snackBar.open('Invalid username or password', 'Dismiss',  {
          duration: 2000,
        });
      } else {
        console.error(error);
      }
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

  redirectBack() {
    this.router.navigate([this.redirectLink]);
  }
}
