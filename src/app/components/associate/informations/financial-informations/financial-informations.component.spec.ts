import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialInformationsComponent } from './financial-informations.component';

describe('FinancialInformationsComponent', () => {
  let component: FinancialInformationsComponent;
  let fixture: ComponentFixture<FinancialInformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialInformationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
