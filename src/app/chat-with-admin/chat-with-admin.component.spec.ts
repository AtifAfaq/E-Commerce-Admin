import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatWithAdminComponent } from './chat-with-admin.component';

describe('ChatWithAdminComponent', () => {
  let component: ChatWithAdminComponent;
  let fixture: ComponentFixture<ChatWithAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatWithAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatWithAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
