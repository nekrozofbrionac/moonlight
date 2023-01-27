import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatComponent } from "./approot/chat/chat.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MessageSpeechBubbleComponent } from './approot/chat/message-speech-bubble/message-speech-bubble.component';
import { LoginComponent } from './approot/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    MessageSpeechBubbleComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
