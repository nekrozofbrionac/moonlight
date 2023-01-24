import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { MessageService } from "../../../lib/services/message.service";
import { MoonlightMessage } from "../../../lib/types/moonlightMessage";
import { MoonlightChannel, NullMoonlightChannel } from "../../../lib/types/moonlightChannel";
import { ChannelService } from "../../../lib/services/channel.service";
import { LoginService } from "../../../lib/services/login.service";

interface MessageFormControls {
  messageContent: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  sendPending: boolean = false;
  private channelsLoading: boolean = false;
  private chatLoading: boolean = false;

  currentChannel: MoonlightChannel = NullMoonlightChannel;
  postedMessages: MoonlightMessage[] = [];
  messageForm = this.formBuilder.group<MessageFormControls>({
    messageContent: '',
  });

  constructor(
    private readonly loginService: LoginService,
    private readonly channelService: ChannelService,
    private readonly messageService: MessageService,
    private readonly formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.channelsLoading = true;
    this.chatLoading = true;
    this.loadConversation();
  }

  loadConversation(): void {
    this.channelsLoading = true;
    this.channelService.getConversations().subscribe(conversations => {
      this.currentChannel = conversations[0];
      this.loadChat();
      this.channelsLoading = false;
    })
  }

  loadChat(): void {
    this.chatLoading = true;
    this.messageService.receiveLog(this.currentChannel).subscribe((messages) => {
      this.postedMessages = messages;
      this.chatLoading = false;
    });
  }

  sendMessage() {
    console.log(this.messageForm.value);
    this.sendPending = true;
    this.messageService.send(this.currentChannel, {
      author: this.loginService.getSelfUser(),
      content: this.messageForm.value.messageContent ?? '',
      timestamp: Date.now(),
      uuid: '',
    }).subscribe((success) => {
      this.loadChat();
      if (success) {
        this.messageForm.controls.messageContent.setValue('');
      }
      this.sendPending = false;
    });
  }

  ctrlEnter() {
    this.messageForm.controls.messageContent.setValue(this.messageForm.controls.messageContent.value + '\n');
  }

  fromSelfUser(message: MoonlightMessage): boolean {
    return message.author.id === this.loginService.getSelfUser().id;
  }
}
