import { TestBed } from '@angular/core/testing';

import { JobInformationsService } from './job-informations.service';

describe('JobInformationsService', () => {
  let service: JobInformationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobInformationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
