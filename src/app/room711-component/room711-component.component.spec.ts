import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Room711ComponentComponent } from './room711-component.component';

describe('Room711ComponentComponent', () => {
  let component: Room711ComponentComponent;
  let fixture: ComponentFixture<Room711ComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Room711ComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Room711ComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
