import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageSpeechBubbleComponent } from './message-speech-bubble.component';

describe('MessageSpeechBubbleComponent', () => {
  let component: MessageSpeechBubbleComponent;
  let fixture: ComponentFixture<MessageSpeechBubbleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageSpeechBubbleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageSpeechBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
