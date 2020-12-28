import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Room713ComponentComponent } from './room713-component.component';

describe('Room713ComponentComponent', () => {
  let component: Room713ComponentComponent;
  let fixture: ComponentFixture<Room713ComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Room713ComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Room713ComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
