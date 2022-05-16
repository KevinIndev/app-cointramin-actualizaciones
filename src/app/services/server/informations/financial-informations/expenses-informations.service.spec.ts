import { TestBed } from '@angular/core/testing';

import { ExpensesInformationsService } from './expenses-informations.service';

describe('ExpensesInformationsService', () => {
  let service: ExpensesInformationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpensesInformationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
