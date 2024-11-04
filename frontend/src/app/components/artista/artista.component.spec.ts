import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistaComponent } from './artista.component';

describe('ArtistaComponent', () => {
  let component: ArtistaComponent;
  let fixture: ComponentFixture<ArtistaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArtistaComponent]
    });
    fixture = TestBed.createComponent(ArtistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
