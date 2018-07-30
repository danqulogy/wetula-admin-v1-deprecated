import { TestBed, inject } from '@angular/core/testing'

import { AilenLibService } from './ailen-lib.service'

describe('AilenLibService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AilenLibService],
    })
  })

  it('should be created', inject([AilenLibService], (service: AilenLibService) => {
    expect(service).toBeTruthy()
  }))
})
