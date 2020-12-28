import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsusedComponentComponent } from './isused-component.component';

describe('IsusedComponentComponent', () => {
  let component: IsusedComponentComponent;
  let fixture: ComponentFixture<IsusedComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsusedComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsusedComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
