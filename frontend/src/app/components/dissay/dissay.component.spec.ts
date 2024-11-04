import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DissayComponent } from './dissay.component';

describe('DissayComponent', () => {
  let component: DissayComponent;
  let fixture: ComponentFixture<DissayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DissayComponent]
    });
    fixture = TestBed.createComponent(DissayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
