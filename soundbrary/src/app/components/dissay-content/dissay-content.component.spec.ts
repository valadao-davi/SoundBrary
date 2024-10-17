import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DissayContentComponent } from './dissay-content.component';

describe('DissayContentComponent', () => {
  let component: DissayContentComponent;
  let fixture: ComponentFixture<DissayContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DissayContentComponent]
    });
    fixture = TestBed.createComponent(DissayContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
