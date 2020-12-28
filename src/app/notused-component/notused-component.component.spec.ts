import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotusedComponentComponent } from './notused-component.component';

describe('NotusedComponentComponent', () => {
  let component: NotusedComponentComponent;
  let fixture: ComponentFixture<NotusedComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotusedComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotusedComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
