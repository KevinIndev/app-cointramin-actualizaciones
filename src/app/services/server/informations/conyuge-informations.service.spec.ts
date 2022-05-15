import { TestBed } from '@angular/core/testing';

import { ConyugeInformationsService } from './conyuge-informations.service';

describe('ConyugeInformationsService', () => {
  let service: ConyugeInformationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConyugeInformationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
