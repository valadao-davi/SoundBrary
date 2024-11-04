import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentoMini2Component } from './instrumento-mini-2.component';

describe('InstrumentoMini2Component', () => {
  let component: InstrumentoMini2Component;
  let fixture: ComponentFixture<InstrumentoMini2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstrumentoMini2Component]
    });
    fixture = TestBed.createComponent(InstrumentoMini2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
