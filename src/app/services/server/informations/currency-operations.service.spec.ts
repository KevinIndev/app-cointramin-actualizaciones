import { TestBed } from '@angular/core/testing';

import { CurrencyOperationsService } from './currency-operations.service';

describe('CurrencyOperationsService', () => {
  let service: CurrencyOperationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyOperationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
