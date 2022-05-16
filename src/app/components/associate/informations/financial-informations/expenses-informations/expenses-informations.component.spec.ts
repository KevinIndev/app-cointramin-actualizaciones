import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesInformationsComponent } from './expenses-informations.component';

describe('ExpensesInformationsComponent', () => {
  let component: ExpensesInformationsComponent;
  let fixture: ComponentFixture<ExpensesInformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesInformationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
