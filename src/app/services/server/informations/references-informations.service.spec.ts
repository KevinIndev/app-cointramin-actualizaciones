import { TestBed } from '@angular/core/testing';

import { ReferencesInformationsService } from './references-informations.service';

describe('ReferencesInformationsService', () => {
  let service: ReferencesInformationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReferencesInformationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
