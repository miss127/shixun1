import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalMessageComponentComponent } from './personal-message-component.component';

describe('PersonalMessageComponentComponent', () => {
  let component: PersonalMessageComponentComponent;
  let fixture: ComponentFixture<PersonalMessageComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalMessageComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalMessageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
