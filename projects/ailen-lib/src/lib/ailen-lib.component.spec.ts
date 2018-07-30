import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { AilenLibComponent } from './ailen-lib.component'

describe('AilenLibComponent', () => {
  let component: AilenLibComponent
  let fixture: ComponentFixture<AilenLibComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AilenLibComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(AilenLibComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
