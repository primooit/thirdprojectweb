import { Posts } from './../model/posts.models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { THIRDPROJECT_API } from './thirdproject.api';
import { Subject } from 'rxjs';

@Injectable()
export class PostsService {
  
  constructor(private http: HttpClient) {

  }

  createOrUpdate(posts: Posts) {
    if (posts.title != null && posts.title != '') {
      return this.http.put(`${THIRDPROJECT_API}/api/posts`, posts);
    } else {
      posts.title = null;
      return this.http.post(`${THIRDPROJECT_API}/api/posts`, posts);
    }
  }

  findAll(page: number, count: number) {
    return this.http.get(`${THIRDPROJECT_API}/api/posts/${page}/${count}`);
  }

  getAllPosts(){
		return this.http.get(`${THIRDPROJECT_API}/api/posts/getAllPosts`);
	}

  findById(title:string){
    return this.http.get(`${THIRDPROJECT_API}/api/posts/${title}`);
  }

  delete(title:string){
    return this.http.delete(`${THIRDPROJECT_API}/api/posts/${title}`);
  }

  addPost(posts: Posts){
		return this.http.post(`${THIRDPROJECT_API}/api/posts`, posts);
	}
  
  public postAdded_Observable = new Subject();
 
    notifyPostAddition(){
      this.postAdded_Observable.next();
  }

}