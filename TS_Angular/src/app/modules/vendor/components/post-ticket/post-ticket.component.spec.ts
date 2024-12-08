import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTicketComponent } from './post-ticket.component';

describe('PostTicketComponent', () => {
  let component: PostTicketComponent;
  let fixture: ComponentFixture<PostTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostTicketComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
