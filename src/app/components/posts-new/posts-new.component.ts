import { OnInit, ViewChild, Component, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResponseApi } from 'src/app/model/response-api';
import { SharedService } from 'src/app/services/shared.service';
import { Posts } from '../../model/posts.models';
import { PostsService } from '../../services/posts.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-posts-new',
  templateUrl: './posts-new.component.html',
  styleUrls: ['./posts-new.component.css']
})

export class PostsNewComponent implements OnInit {

  @ViewChild("form", { static: true })
  form: NgForm;

  posts = new Posts('', '', 0, '', '');
  shared: SharedService;
  message: {};
  classCss: {};

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute) {
    this.shared = SharedService.getInstance();

  }

  ngOnInit() {
    let id: string = this.route.snapshot.params['id'];
    if (id != undefined) {
      this.findById(id);
    }
  }

  findById(postId: string) {
    this.postsService.findById(postId).subscribe((responseApi: ResponseApi) => {
      this.posts = responseApi.data;
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  register() {
    this.message = {};
    this.postsService.createOrUpdate(this.posts).subscribe((responseApi: ResponseApi) => {
      this.posts = new Posts('', '', 0, '', '');
      let posts: Posts = responseApi.data;
      this.postsService.notifyPostAddition();
      this.form.resetForm();
      this.showMessage({
        type: 'success',
        text: `Registered ${posts.title} successfully`
      });
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  getFormGroupClass(isInvalid: boolean, isDirty: boolean): {} {
    return {
      'form-group': true,
      'has-error': isInvalid && isDirty,
      'has-success': !isInvalid && isDirty
    };

  }

  private showMessage(message: { type: string, text: string }): void {
    this.message = message;
    this.buildClasses(message.type);
    setTimeout(() => {
      this.message = undefined;
    }, 3000);
  }

  private buildClasses(type: string): void {
    this.classCss = {
      'alert': true
    }
    this.classCss['alert-' + type] = true;
  }

  onFileChange(event): void {
    if (event.target.files[0].size > 2000000) {
      this.showMessage({
        type: 'error',
        text: 'Maximum image size is 2 MB'
      });
    } else {
      this.posts.image = '';
      var reader = new FileReader();
      reader.onloadend = (e: Event) => {
        this.posts.image = reader.result as string;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  addPost() {
    this.posts = new Posts("", "", 0, "", "");

    if (this.posts.title && this.posts.description) {
      this.postsService.addPost(this.posts).subscribe(res => {
        this.postsService.notifyPostAddition();
      });
    } else {
      alert('Title and Description required');
    }
  }

}