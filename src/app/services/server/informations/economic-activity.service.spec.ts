import { TestBed } from '@angular/core/testing';

import { EconomicActivityService } from './economic-activity.service';

describe('EconomicActivityService', () => {
  let service: EconomicActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EconomicActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
