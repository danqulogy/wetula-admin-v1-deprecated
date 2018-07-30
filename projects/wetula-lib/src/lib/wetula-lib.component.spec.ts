import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WetulaLibComponent } from './wetula-lib.component';

describe('WetulaLibComponent', () => {
  let component: WetulaLibComponent;
  let fixture: ComponentFixture<WetulaLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WetulaLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WetulaLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
