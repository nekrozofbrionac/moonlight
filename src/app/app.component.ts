import { Component, OnInit } from '@angular/core';
import { LoginService } from "../lib/services/login.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'moonlight';

  constructor(
    private readonly router: Router,
    private readonly activeRoute: ActivatedRoute,
    private readonly loginService: LoginService,
  ) {
  }

  ngOnInit(): void {
    if (!this.loginService.loggedIn()) {
      const redirectUrl: string = location.pathname;
      this.router.navigate(
        ['/login'],
        {
          queryParams: {
            redirectTo: redirectUrl,
          },
        },
      );
    }
  }
}
