import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseApi } from 'src/app/model/response-api';
import { SharedService } from 'src/app/services/shared.service';
import { ShowPostService } from 'src/app/services/show-post.service';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.css'],
  providers: [ShowPostService]
})
export class ShowPostComponent implements OnInit {

  public posts: any[];
  page: number = 0;
  count: number = 5;
  pages: Array<number>;
  shared: SharedService;
  message: {};
  classCss: {};
  listUser = [];

  constructor(
    private router: Router,
    private showPostService: ShowPostService
  ) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    this.findAll(this.page, this.count);
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
    this.showPostService.findAll(page, count).subscribe((responseApi: ResponseApi) => {
      this.listUser = responseApi['data']['content'];
      this.pages = new Array(responseApi['data']['totalPages']);
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }


}
 
