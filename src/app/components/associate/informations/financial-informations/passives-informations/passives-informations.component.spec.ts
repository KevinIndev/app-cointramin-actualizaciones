import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassivesInformationsComponent } from './passives-informations.component';

describe('PassivesInformationsComponent', () => {
  let component: PassivesInformationsComponent;
  let fixture: ComponentFixture<PassivesInformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassivesInformationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassivesInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
