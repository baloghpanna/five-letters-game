import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageNoWordComponent } from './message-no-word.component';

describe('MessageNoWordComponent', () => {
  let component: MessageNoWordComponent;
  let fixture: ComponentFixture<MessageNoWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageNoWordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessageNoWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
