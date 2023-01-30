import { Component, OnInit } from '@angular/core';
import { MessageService } from "../../../lib/services/message.service";
import { MoonlightMessage } from "../../../lib/types/moonlightMessage";
import { MoonlightChannel, NullMoonlightChannel } from "../../../lib/types/moonlightChannel";
import { ChannelService } from "../../../lib/services/channel.service";
import { LoginService } from "../../../lib/services/login.service";

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
  messageContent: string = '';

  constructor(
    private readonly loginService: LoginService,
    private readonly channelService: ChannelService,
    private readonly messageService: MessageService,
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
    const selfUser = this.loginService.getSelfUser();
    if (selfUser === undefined) {
      return;
    }
    console.log(this.messageContent);
    this.sendPending = true;
    this.messageService.send({
      channel: this.currentChannel,
      author: selfUser,
      content: this.messageContent ?? '',
      created: Date.now(),
      id: ''
    }).subscribe((success) => {
      this.loadChat();
      if (success) {
        this.messageContent = '';
      }
      this.sendPending = false;
    });
  }

  ctrlEnter() {
    this.messageContent += '\n';
  }

  fromSelfUser(message: MoonlightMessage): boolean {
    return message.author.id === this.loginService.getSelfUser()?.id;
  }
}
