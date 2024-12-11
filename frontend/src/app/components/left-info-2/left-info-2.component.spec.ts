import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftInfo2Component } from './left-info-2.component';

describe('LeftInfo2Component', () => {
  let component: LeftInfo2Component;
  let fixture: ComponentFixture<LeftInfo2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeftInfo2Component]
    });
    fixture = TestBed.createComponent(LeftInfo2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
