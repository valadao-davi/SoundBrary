import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MMiniComponent } from './m-mini.component';

describe('MMiniComponent', () => {
  let component: MMiniComponent;
  let fixture: ComponentFixture<MMiniComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MMiniComponent]
    });
    fixture = TestBed.createComponent(MMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
