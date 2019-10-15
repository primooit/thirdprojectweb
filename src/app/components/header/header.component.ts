import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  public shared: SharedService;

  constructor(private userService: UserService,
              private router: Router){
      this.shared = SharedService.getInstance();
      this.shared.user = new User('','','','','','','');
  }

  
  ngOnInit(){
  }

  signOut() : void {
    this.shared.token = null;
    this.shared.user = null;
    localStorage.removeItem('currentUser');
    window.location.href = '/login';
    window.location.reload();
  }
}