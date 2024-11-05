import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarDissayCardsComponent } from './criar-dissay-cards.component';

describe('CriarDissayCardsComponent', () => {
  let component: CriarDissayCardsComponent;
  let fixture: ComponentFixture<CriarDissayCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CriarDissayCardsComponent]
    });
    fixture = TestBed.createComponent(CriarDissayCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
