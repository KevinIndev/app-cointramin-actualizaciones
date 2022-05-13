import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationInformationsComponent } from './location-informations.component';

describe('LocationInformationsComponent', () => {
  let component: LocationInformationsComponent;
  let fixture: ComponentFixture<LocationInformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationInformationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
