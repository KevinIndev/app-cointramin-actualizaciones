import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomesInformationsComponent } from './incomes-informations.component';

describe('IncomesInformationsComponent', () => {
  let component: IncomesInformationsComponent;
  let fixture: ComponentFixture<IncomesInformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomesInformationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomesInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
