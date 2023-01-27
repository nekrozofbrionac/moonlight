import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from "./approot/chat/chat.component";
import { LoginComponent } from "./approot/login/login.component";

const routes: Routes = [
  { path: 'chat', component: ChatComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/chat', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
