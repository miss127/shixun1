import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Room709ComponentComponent } from './room709-component.component';

describe('Room709ComponentComponent', () => {
  let component: Room709ComponentComponent;
  let fixture: ComponentFixture<Room709ComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Room709ComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Room709ComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
