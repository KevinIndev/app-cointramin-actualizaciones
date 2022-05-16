import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependentsInformationsComponent } from './dependents-informations.component';

describe('DependentsInformationsComponent', () => {
  let component: DependentsInformationsComponent;
  let fixture: ComponentFixture<DependentsInformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DependentsInformationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DependentsInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
