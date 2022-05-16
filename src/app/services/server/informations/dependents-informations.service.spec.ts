import { TestBed } from '@angular/core/testing';

import { DependentsInformationsService } from './dependents-informations.service';

describe('DependentsInformationsService', () => {
  let service: DependentsInformationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DependentsInformationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
