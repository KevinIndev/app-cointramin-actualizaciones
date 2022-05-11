import { TestBed } from '@angular/core/testing';

import { PersonalInformationsService } from './personal-informations.service';

describe('PersonalInformationsService', () => {
  let service: PersonalInformationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalInformationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
