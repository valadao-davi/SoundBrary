import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentoOverlayComponent } from './instrumento-overlay.component';

describe('InstrumentoOverlayComponent', () => {
  let component: InstrumentoOverlayComponent;
  let fixture: ComponentFixture<InstrumentoOverlayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstrumentoOverlayComponent]
    });
    fixture = TestBed.createComponent(InstrumentoOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
