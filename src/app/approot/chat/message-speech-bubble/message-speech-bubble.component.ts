import { Component, Input } from '@angular/core';
import { MoonlightMessage, NullMoonlightMessage } from "../../../../lib/types/moonlightMessage";
import { ThemePalette } from "@angular/material/core";

@Component({
  selector: 'app-message-speech-bubble',
  templateUrl: './message-speech-bubble.component.html',
  styleUrls: ['./message-speech-bubble.component.scss']
})
export class MessageSpeechBubbleComponent {
  @Input()
  message: MoonlightMessage = NullMoonlightMessage;

  @Input()
  selfUser: boolean = false;
}
