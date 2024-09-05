import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageSolutionComponent } from './message-solution.component';

describe('MessageSolutionComponent', () => {
  let component: MessageSolutionComponent;
  let fixture: ComponentFixture<MessageSolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageSolutionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessageSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
