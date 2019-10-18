import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PostsNewComponent } from './posts-new.component';


describe('PostsNewComponent', () => {
  let component: PostsNewComponent;
  let fixture: ComponentFixture<PostsNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostsNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
