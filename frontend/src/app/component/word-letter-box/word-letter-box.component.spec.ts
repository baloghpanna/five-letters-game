import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordLetterBoxComponent } from './word-letter-box.component';

describe('WordLetterBoxComponent', () => {
  let component: WordLetterBoxComponent;
  let fixture: ComponentFixture<WordLetterBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordLetterBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WordLetterBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
