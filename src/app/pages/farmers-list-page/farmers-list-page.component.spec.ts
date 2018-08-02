import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { FarmersListPageComponent } from './farmers-list-page.component'

describe('FarmersListPageComponent', () => {
  let component: FarmersListPageComponent
  let fixture: ComponentFixture<FarmersListPageComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FarmersListPageComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmersListPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
