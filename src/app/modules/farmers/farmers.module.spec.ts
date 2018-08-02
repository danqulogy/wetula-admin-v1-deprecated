import { FarmersModule } from './farmers.module'

describe('FarmersModule', () => {
  let farmersModule: FarmersModule

  beforeEach(() => {
    farmersModule = new FarmersModule()
  })

  it('should create an instance', () => {
    expect(farmersModule).toBeTruthy()
  })
})
