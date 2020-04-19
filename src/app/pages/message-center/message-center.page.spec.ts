import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageCenterPage } from './message-center.page';

describe('MessageCenterPage', () => {
  let component: MessageCenterPage;
  let fixture: ComponentFixture<MessageCenterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageCenterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageCenterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
