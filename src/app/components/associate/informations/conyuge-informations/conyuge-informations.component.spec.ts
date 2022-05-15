import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConyugeInformationsComponent } from './conyuge-informations.component';

describe('ConyugeInformationsComponent', () => {
  let component: ConyugeInformationsComponent;
  let fixture: ComponentFixture<ConyugeInformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConyugeInformationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConyugeInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
