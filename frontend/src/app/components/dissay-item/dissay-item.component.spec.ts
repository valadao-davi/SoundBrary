import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DissayItemComponent } from './dissay-item.component';

describe('DissayItemComponent', () => {
  let component: DissayItemComponent;
  let fixture: ComponentFixture<DissayItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DissayItemComponent]
    });
    fixture = TestBed.createComponent(DissayItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
