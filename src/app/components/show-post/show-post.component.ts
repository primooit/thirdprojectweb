import { DialogService } from './../../dialog.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseApi } from 'src/app/model/response-api';
import { SharedService } from 'src/app/services/shared.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.css']
})
export class ShowPostComponent implements OnInit {

  posts: any[];
  page: number = 0;
  count: number = 5;
  pages: Array<number>;
  shared: SharedService;
  message: {};
  classCss: {};
  listPosts = [];



  constructor(
    private dialogService: DialogService,
    private postsService: PostsService,
    private router: Router
  ) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    this.findAll(this.page, this.count);
    /*this.getAllPosts();

    this.postsService.postAdded_Observable.subscribe(res => {
      this.getAllPosts(); 
    });*/
  }


  private buildClasses(type: string): void {
    this.classCss = {
      'alert': true
    }
    this.classCss['alert-' + type] = true;

  }

  private showMessage(message: { type: string, text: string }): void {
    this.message = message;
    this.buildClasses(message.type);
    setTimeout(() => {
      this.message = undefined;
    }, 3000);
  }

  findAll(page: number, count: number) {
    this.postsService.findAll(page, count).subscribe((responseApi: ResponseApi) => {
      this.listPosts = responseApi['data']['content'];
      this.pages = new Array(responseApi['data']['totalPages']);
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  getAllPosts(){
  	this.postsService.getAllPosts().subscribe(result => {
  		console.log('result is ', result);
  		this.posts = result['data'];
  	});
  }



}

