import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyOperationsComponent } from './currency-operations.component';

describe('CurrencyOperationsComponent', () => {
  let component: CurrencyOperationsComponent;
  let fixture: ComponentFixture<CurrencyOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyOperationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
