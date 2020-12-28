import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HasusedComponentComponent } from './hasused-component.component';

describe('HasusedComponentComponent', () => {
  let component: HasusedComponentComponent;
  let fixture: ComponentFixture<HasusedComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HasusedComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HasusedComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
