import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbcLettersComponent } from './abc-letters.component';

describe('AbcLettersComponent', () => {
  let component: AbcLettersComponent;
  let fixture: ComponentFixture<AbcLettersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbcLettersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AbcLettersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
