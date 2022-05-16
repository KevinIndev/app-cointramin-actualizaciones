import { TestBed } from '@angular/core/testing';

import { IncomesInformationsService } from './incomes-informations.service';

describe('IncomesInformationsService', () => {
  let service: IncomesInformationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncomesInformationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
