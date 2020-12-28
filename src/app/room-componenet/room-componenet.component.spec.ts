import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomComponenetComponent } from './room-componenet.component';

describe('RoomComponenetComponent', () => {
  let component: RoomComponenetComponent;
  let fixture: ComponentFixture<RoomComponenetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomComponenetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomComponenetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
