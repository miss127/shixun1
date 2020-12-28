import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Room509ComponentComponent } from './room509-component.component';

describe('Room509ComponentComponent', () => {
  let component: Room509ComponentComponent;
  let fixture: ComponentFixture<Room509ComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Room509ComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Room509ComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
