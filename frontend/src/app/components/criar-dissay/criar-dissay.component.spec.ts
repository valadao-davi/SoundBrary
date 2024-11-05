import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarDissayComponent } from './criar-dissay.component';

describe('CriarDissayComponent', () => {
  let component: CriarDissayComponent;
  let fixture: ComponentFixture<CriarDissayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CriarDissayComponent]
    });
    fixture = TestBed.createComponent(CriarDissayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
