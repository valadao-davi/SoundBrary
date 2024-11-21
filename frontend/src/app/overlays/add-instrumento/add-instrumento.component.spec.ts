import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInstrumentoComponent } from './add-instrumento.component';

describe('AddInstrumentoComponent', () => {
  let component: AddInstrumentoComponent;
  let fixture: ComponentFixture<AddInstrumentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddInstrumentoComponent]
    });
    fixture = TestBed.createComponent(AddInstrumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
