import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePicOverlayComponent } from './profile-pic-overlay.component';

describe('ProfilePicOverlayComponent', () => {
  let component: ProfilePicOverlayComponent;
  let fixture: ComponentFixture<ProfilePicOverlayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilePicOverlayComponent]
    });
    fixture = TestBed.createComponent(ProfilePicOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
