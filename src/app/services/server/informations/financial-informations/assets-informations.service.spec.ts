import { TestBed } from '@angular/core/testing';

import { AssetsInformationsService } from './assets-informations.service';

describe('AssetsInformationsService', () => {
  let service: AssetsInformationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetsInformationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
