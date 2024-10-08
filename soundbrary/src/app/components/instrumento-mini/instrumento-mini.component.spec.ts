import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentoMiniComponent } from './instrumento-mini.component';

describe('InstrumentoMiniComponent', () => {
  let component: InstrumentoMiniComponent;
  let fixture: ComponentFixture<InstrumentoMiniComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstrumentoMiniComponent]
    });
    fixture = TestBed.createComponent(InstrumentoMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
