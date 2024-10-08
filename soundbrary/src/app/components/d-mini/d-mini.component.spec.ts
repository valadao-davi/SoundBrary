import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DMiniComponent } from './d-mini.component';

describe('DMiniComponent', () => {
  let component: DMiniComponent;
  let fixture: ComponentFixture<DMiniComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DMiniComponent]
    });
    fixture = TestBed.createComponent(DMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
