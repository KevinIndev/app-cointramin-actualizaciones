import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferencesInformationsComponent } from './references-informations.component';

describe('ReferencesInformationsComponent', () => {
  let component: ReferencesInformationsComponent;
  let fixture: ComponentFixture<ReferencesInformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferencesInformationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferencesInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
