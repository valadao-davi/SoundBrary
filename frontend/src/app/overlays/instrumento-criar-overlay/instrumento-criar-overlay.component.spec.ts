import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentoCriarOverlayComponent } from './instrumento-criar-overlay.component';

describe('InstrumentoCriarOverlayComponent', () => {
  let component: InstrumentoCriarOverlayComponent;
  let fixture: ComponentFixture<InstrumentoCriarOverlayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstrumentoCriarOverlayComponent]
    });
    fixture = TestBed.createComponent(InstrumentoCriarOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
