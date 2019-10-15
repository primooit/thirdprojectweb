import { UserService } from './../../services/user.service';
import { SharedService } from 'src/app/services/shared.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { ResponseApi } from 'src/app/model/response-api';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})
export class UserNewComponent implements OnInit {

@ViewChild("form", {static: true}) 
form: NgForm

  user = new User('','','','','','','');
  shared: SharedService;
  message: {};
  classCss: {};

  constructor(
    private UserService: UserService,
    private route: ActivatedRoute
   ){
     this.shared=SharedService.getInstance();
   }

  ngOnInit() {
    let id: string = this.route.snapshot.params['id'];
    if(id != undefined){
      this.findById(id);
    }
  }
  
  findById(id:string){
    this.UserService.findById(id).subscribe((responseApi: ResponseApi) =>{
      this.user = responseApi.data;
      this.user.password= '';
    }, err => {
        this.showMessage({
          type: 'error',
          text: err['error']['errors'][0]
      });
    });
  }

  register(){
    this.message = {};
    this.UserService.createOrUpdate(this.user).subscribe((responseApi: ResponseApi)=>{
      this.user = new User('','','','','','','');
      let userRet: User = responseApi.data;
      this.form.resetForm();
      this.showMessage({
        type: 'success',
        text: `Registered ${userRet.email} succesfully`
      });
      }, err => {
        this.showMessage({
          type: 'error',
          text: err['error']['errors'][0]
        });
      });
  }
  
  private showMessage(message: {type: string, text: string}): void{
    this.message = message;
    this.buildClasses(message.type);
    setTimeout(() => {
      this.message= undefined;
    }, 3000);
  }

  private buildClasses(type: string): void{
    this.classCss= {
      'alert': true
    }
    this.classCss['alert-'+type]= true;
  }

  
  getFromGroupClass(isInvalid : boolean, isDirty):{} {
    return {
      'form-group': true,
      'has-error' : isInvalid && isDirty,
      'has-sucess': !isInvalid && isDirty
    };

  }

}
