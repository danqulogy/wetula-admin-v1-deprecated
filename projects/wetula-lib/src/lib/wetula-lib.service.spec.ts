import { TestBed, inject } from '@angular/core/testing';

import { WetulaLibService } from './wetula-lib.service';

describe('WetulaLibService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WetulaLibService]
    });
  });

  it('should be created', inject([WetulaLibService], (service: WetulaLibService) => {
    expect(service).toBeTruthy();
  }));
});
