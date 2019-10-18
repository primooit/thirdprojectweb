import { PostsService } from 'src/app/services/posts.service';
import { TestBed, inject } from '@angular/core/testing';


describe('PostsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostsService]
    });
  });

  it('should be created', inject([PostsService], (service: PostsService) => {
    expect(service).toBeTruthy();
  }));
});

