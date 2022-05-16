import { TestBed } from '@angular/core/testing';

import { PassivesInformationsService } from './passives-informations.service';

describe('PassivesInformationsService', () => {
  let service: PassivesInformationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassivesInformationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
